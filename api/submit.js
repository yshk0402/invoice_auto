"use strict";

const path = require("path");

const { CATEGORY_OPTIONS, DEMO_USERS } = require("../lib/demo-users");
const { json, allowMethod, readJson } = require("../lib/http");
const {
  appendSubmissionRow,
  missingGoogleConfig,
  resolveUserSheetTab,
  uploadReceiptImage,
} = require("../lib/google");

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function extensionFromMimeType(mimeType) {
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  return ".jpg";
}

function decodeDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:(.+);base64,(.+)$/);
  if (!match) {
    throw new Error("invalid_data_url");
  }

  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function validateSubmission(body) {
  if (!body.date) throw new Error("date_required");
  if (!Number.isFinite(Number(body.amount)) || Number(body.amount) <= 0) {
    throw new Error("amount_required");
  }
  if (!body.merchant || !String(body.merchant).trim()) {
    throw new Error("merchant_required");
  }
  if (!CATEGORY_OPTIONS.includes(body.expense_category)) {
    throw new Error("invalid_expense_category");
  }
  if (!body.submitter || !DEMO_USERS.some((item) => item.employee_id === body.submitter)) {
    throw new Error("invalid_submitter");
  }
  if (!body.language) throw new Error("language_required");
  if (!body.receiptDataUrl) throw new Error("receipt_required");
}

module.exports = async function handler(request, response) {
  if (!allowMethod(request, response, "POST")) {
    return;
  }

  const missing = missingGoogleConfig();
  if (missing.length) {
    json(response, 400, { error: "google_config_missing", missing });
    return;
  }

  try {
    const body = await readJson(request);
    validateSubmission(body);

    const { mimeType, buffer } = decodeDataUrl(body.receiptDataUrl);
    const receiptMimeType = body.receiptMimeType || mimeType;
    const safeFileName = sanitizeFileName(body.receiptFileName || "receipt");
    const extension = path.extname(safeFileName) ? "" : extensionFromMimeType(receiptMimeType);
    const fileName = `${Date.now()}-${safeFileName}${extension}`;

    const receiptImage = await uploadReceiptImage({
      buffer,
      mimeType: receiptMimeType,
      fileName,
    });

    const sheetTabName = await resolveUserSheetTab(body.submitter);
    const submission = {
      date: body.date,
      amount: Number(body.amount),
      merchant: String(body.merchant).trim(),
      expense_category: body.expense_category,
      receipt_image: receiptImage,
      submitter: body.submitter,
      submitted_at: new Date().toISOString(),
      language: body.language,
      sheet_tab_name: sheetTabName,
    };

    await appendSubmissionRow(sheetTabName, submission);
    json(response, 200, { submission });
  } catch (error) {
    const knownErrors = new Set([
      "payload_too_large",
      "invalid_json",
      "invalid_data_url",
      "date_required",
      "amount_required",
      "merchant_required",
      "invalid_expense_category",
      "invalid_submitter",
      "language_required",
      "receipt_required",
      "submitter_not_registered",
    ]);
    const statusCode = knownErrors.has(error.message) ? 400 : 502;
    json(response, statusCode, { error: error.message || "submit_failed" });
  }
};
