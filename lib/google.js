"use strict";

const crypto = require("crypto");

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_DRIVE_UPLOAD_URL =
  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink,webContentLink";
const GOOGLE_SHEETS_BASE_URL = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
];

let cachedAccessToken = null;

function getGoogleConfig() {
  return {
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL || "",
    privateKey: normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY || ""),
    spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID || "",
    driveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "",
  };
}

function normalizePrivateKey(value) {
  return value.replace(/\\n/g, "\n");
}

function missingGoogleConfig() {
  const config = getGoogleConfig();
  const missing = [];

  if (!config.clientEmail) missing.push("GOOGLE_CLIENT_EMAIL");
  if (!config.privateKey) missing.push("GOOGLE_PRIVATE_KEY");
  if (!config.spreadsheetId) missing.push("GOOGLE_SPREADSHEET_ID");
  if (!config.driveFolderId) missing.push("GOOGLE_DRIVE_FOLDER_ID");

  return missing;
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createSignedJwt(config) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: config.clientEmail,
    scope: GOOGLE_SCOPES.join(" "),
    aud: GOOGLE_TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsignedToken)
    .end()
    .sign(config.privateKey);

  return `${unsignedToken}.${base64UrlEncode(signature)}`;
}

async function getAccessToken() {
  if (cachedAccessToken && cachedAccessToken.expiresAt > Date.now() + 60_000) {
    return cachedAccessToken.value;
  }

  const missing = missingGoogleConfig();
  if (missing.length) {
    throw new Error(`google_config_missing:${missing.join(",")}`);
  }

  const config = getGoogleConfig();
  const assertion = createSignedJwt(config);
  const body = new URLSearchParams({
    grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
    assertion,
  });

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error_description || payload.error || "google_token_request_failed");
  }

  cachedAccessToken = {
    value: payload.access_token,
    expiresAt: Date.now() + payload.expires_in * 1000,
  };

  return cachedAccessToken.value;
}

async function googleRequest(url, options) {
  const accessToken = await getAccessToken();
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options && options.headers ? options.headers : {}),
    },
  });

  const contentType = response.headers.get("content-type") || "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (payload && payload.error && payload.error.message) ||
      (typeof payload === "string" ? payload : "google_request_failed");
    throw new Error(message);
  }

  return payload;
}

async function uploadReceiptImage({ buffer, mimeType, fileName }) {
  const boundary = `invoice-auto-${crypto.randomUUID()}`;
  const metadata = JSON.stringify({
    name: fileName,
    parents: [getGoogleConfig().driveFolderId],
  });
  const delimiter = `--${boundary}\r\n`;
  const closeDelimiter = `--${boundary}--`;
  const multipartBody = Buffer.concat([
    Buffer.from(
      `${delimiter}Content-Type: application/json; charset=UTF-8\r\n\r\n${metadata}\r\n` +
        `${delimiter}Content-Type: ${mimeType}\r\n\r\n`,
      "utf8"
    ),
    buffer,
    Buffer.from(`\r\n${closeDelimiter}`, "utf8"),
  ]);

  const payload = await googleRequest(GOOGLE_DRIVE_UPLOAD_URL, {
    method: "POST",
    headers: {
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });

  return {
    file_id: payload.id,
    file_name: payload.name,
    view_url: payload.webViewLink || `https://drive.google.com/file/d/${payload.id}/view`,
    download_url: payload.webContentLink || `https://drive.google.com/uc?id=${payload.id}&export=download`,
  };
}

async function readMasterSheetUsers() {
  const spreadsheetId = getGoogleConfig().spreadsheetId;
  const range = encodeURIComponent("Master Sheet!A:F");
  const url = `${GOOGLE_SHEETS_BASE_URL}/${spreadsheetId}/values/${range}`;
  const payload = await googleRequest(url, { method: "GET" });
  const rows = payload.values || [];

  if (rows.length < 2) {
    return [];
  }

  const [headers, ...dataRows] = rows;
  return dataRows.map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index] || "";
    });
    return record;
  });
}

async function resolveUserSheetTab(employeeId) {
  const rows = await readMasterSheetUsers();
  const row = rows.find((item) => item.employee_id === employeeId);

  if (!row) {
    throw new Error("submitter_not_registered");
  }

  return row.sheet_tab_name || `USER_${employeeId}`;
}

async function appendSubmissionRow(sheetTabName, submission) {
  const spreadsheetId = getGoogleConfig().spreadsheetId;
  const range = encodeURIComponent(`${sheetTabName}!A:H`);
  const url =
    `${GOOGLE_SHEETS_BASE_URL}/${spreadsheetId}/values/${range}:append` +
    "?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS";

  await googleRequest(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      values: [[
        submission.submitted_at,
        submission.date,
        submission.merchant,
        submission.amount,
        submission.expense_category,
        submission.receipt_image.view_url,
        submission.submitter,
        submission.language,
      ]],
    }),
  });
}

module.exports = {
  appendSubmissionRow,
  missingGoogleConfig,
  resolveUserSheetTab,
  uploadReceiptImage,
};
