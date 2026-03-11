const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const PORT = Number(process.env.PORT || 4173);
const ROOT = __dirname;
const RUNTIME_DIR = path.join(ROOT, "runtime");
const UPLOAD_DIR = path.join(RUNTIME_DIR, "uploads");
const PER_USER_DIR = path.join(RUNTIME_DIR, "per-user");
const MASTER_CSV = path.join(RUNTIME_DIR, "master-sheet.csv");
const SUBMISSIONS_JSON = path.join(RUNTIME_DIR, "submissions.json");

const DEMO_USERS = [
  { employee_id: "id1", password: "pass1", user_name: "Demo User 1", role: "Employee", preferred_language: "ja", active: "true" },
  { employee_id: "id2", password: "pass2", user_name: "Demo User 2", role: "Employee", preferred_language: "en", active: "true" },
  { employee_id: "id3", password: "pass3", user_name: "Demo User 3", role: "ForeignWorker", preferred_language: "zh", active: "true" },
  { employee_id: "id4", password: "pass4", user_name: "Demo User 4", role: "ForeignWorker", preferred_language: "vi", active: "true" },
  { employee_id: "id5", password: "pass5", user_name: "Demo User 5", role: "Employee", preferred_language: "ja", active: "true" },
].map((user) => ({ ...user, sheet_tab_name: `USER_${user.employee_id}` }));

function ensureRuntime() {
  fs.mkdirSync(RUNTIME_DIR, { recursive: true });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  fs.mkdirSync(PER_USER_DIR, { recursive: true });
  if (!fs.existsSync(SUBMISSIONS_JSON)) {
    fs.writeFileSync(SUBMISSIONS_JSON, "[]\n");
  }
  writeMasterCsv();
  DEMO_USERS.forEach((user) => ensureUserCsv(user.employee_id));
}

function writeMasterCsv() {
  const lines = [
    "employee_id,user_name,role,preferred_language,sheet_tab_name,active",
    ...DEMO_USERS.map((user) =>
      [user.employee_id, user.user_name, user.role, user.preferred_language, user.sheet_tab_name, user.active].join(",")
    ),
  ];
  fs.writeFileSync(MASTER_CSV, `${lines.join("\n")}\n`);
}

function ensureUserCsv(employeeId) {
  const filePath = path.join(PER_USER_DIR, `USER_${employeeId}.csv`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
      filePath,
      "submitted_at,date,merchant,amount,expense_category,receipt_image,submitter,language\n"
    );
  }
  return filePath;
}

function readSubmissions() {
  return JSON.parse(fs.readFileSync(SUBMISSIONS_JSON, "utf8"));
}

function writeSubmissions(submissions) {
  fs.writeFileSync(SUBMISSIONS_JSON, `${JSON.stringify(submissions, null, 2)}\n`);
}

function json(response, statusCode, payload) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 15 * 1024 * 1024) {
        reject(new Error("payload_too_large"));
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    request.on("error", reject);
  });
}

function contentType(filePath) {
  const extension = path.extname(filePath);
  if (extension === ".html") return "text/html; charset=utf-8";
  if (extension === ".css") return "text/css; charset=utf-8";
  if (extension === ".js") return "application/javascript; charset=utf-8";
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".csv") return "text/csv; charset=utf-8";
  if (extension === ".png") return "image/png";
  if (extension === ".jpg" || extension === ".jpeg") return "image/jpeg";
  if (extension === ".webp") return "image/webp";
  return "application/octet-stream";
}

function serveFile(response, filePath) {
  if (!fs.existsSync(filePath)) {
    response.writeHead(404);
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "Content-Type": contentType(filePath) });
  fs.createReadStream(filePath).pipe(response);
}

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

function extensionFromMimeType(mimeType) {
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  return ".jpg";
}

function decodeDataUrl(dataUrl) {
  const match = dataUrl.match(/^data:(.+);base64,(.+)$/);
  if (!match) throw new Error("invalid_data_url");
  return {
    mimeType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function csvEscape(value) {
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, "\"\"")}"`;
  }
  return stringValue;
}

function appendUserCsv(submission) {
  const filePath = ensureUserCsv(submission.submitter);
  const row = [
    submission.submitted_at,
    submission.date,
    submission.merchant,
    submission.amount,
    submission.expense_category,
    submission.receipt_image,
    submission.submitter,
    submission.language,
  ].map(csvEscape);
  fs.appendFileSync(filePath, `${row.join(",")}\n`);
}

function resetRuntimeData() {
  if (fs.existsSync(UPLOAD_DIR)) {
    for (const name of fs.readdirSync(UPLOAD_DIR)) {
      fs.rmSync(path.join(UPLOAD_DIR, name), { recursive: true, force: true });
    }
  }
  if (fs.existsSync(PER_USER_DIR)) {
    for (const name of fs.readdirSync(PER_USER_DIR)) {
      fs.rmSync(path.join(PER_USER_DIR, name), { force: true });
    }
  }
  writeSubmissions([]);
  writeMasterCsv();
  DEMO_USERS.forEach((user) => ensureUserCsv(user.employee_id));
}

ensureRuntime();

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/api/bootstrap") {
    json(response, 200, { users: DEMO_USERS });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/login") {
    try {
      const body = await parseBody(request);
      const user = DEMO_USERS.find(
        (item) => item.employee_id === body.employeeId && item.password === body.password
      );
      if (!user) {
        json(response, 401, { error: "invalid_credentials" });
        return;
      }
      json(response, 200, {
        user: {
          employee_id: user.employee_id,
          user_name: user.user_name,
          role: user.role,
          preferred_language: user.preferred_language,
          sheet_tab_name: user.sheet_tab_name,
        },
      });
    } catch (error) {
      json(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/submit") {
    try {
      const body = await parseBody(request);
      const { mimeType, buffer } = decodeDataUrl(body.receiptDataUrl);
      const extension = extensionFromMimeType(body.receiptMimeType || mimeType);
      const safeFileName = sanitizeFileName(body.receiptFileName || "receipt");
      const fileName = `${Date.now()}-${safeFileName}${path.extname(safeFileName) ? "" : extension}`;
      const uploadPath = path.join(UPLOAD_DIR, fileName);
      fs.writeFileSync(uploadPath, buffer);

      const submission = {
        date: body.date,
        amount: Number(body.amount),
        merchant: body.merchant,
        expense_category: body.expense_category,
        receipt_image: `runtime/uploads/${fileName}`,
        submitter: body.submitter,
        submitted_at: new Date().toISOString(),
        language: body.language,
      };

      const submissions = readSubmissions();
      submissions.push(submission);
      writeSubmissions(submissions);
      appendUserCsv(submission);

      json(response, 200, { submission });
    } catch (error) {
      json(response, 400, { error: error.message });
    }
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/reset") {
    resetRuntimeData();
    json(response, 200, { ok: true });
    return;
  }

  if (request.method === "GET" && url.pathname === "/api/master-sheet.csv") {
    serveFile(response, MASTER_CSV);
    return;
  }

  if (request.method === "GET" && url.pathname.startsWith("/api/per-user/")) {
    const fileName = path.basename(url.pathname);
    serveFile(response, path.join(PER_USER_DIR, fileName));
    return;
  }

  if (request.method === "GET" && url.pathname.startsWith("/runtime/")) {
    serveFile(response, path.join(ROOT, url.pathname));
    return;
  }

  if (request.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    serveFile(response, path.join(ROOT, "index.html"));
    return;
  }

  if (request.method === "GET" && ["/app.js", "/styles.css", "/README.md"].includes(url.pathname)) {
    serveFile(response, path.join(ROOT, url.pathname.slice(1)));
    return;
  }

  response.writeHead(404);
  response.end("Not found");
});

server.listen(PORT, () => {
  console.log(`Invoice Auto demo server running at http://localhost:${PORT}`);
  console.log(`Master Sheet CSV: http://localhost:${PORT}/api/master-sheet.csv`);
});
