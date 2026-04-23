"use strict";

function json(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

async function readJson(request) {
  if (request.body && typeof request.body === "object") {
    return request.body;
  }

  const chunks = [];
  let totalLength = 0;

  for await (const chunk of request) {
    totalLength += chunk.length;
    if (totalLength > 15 * 1024 * 1024) {
      throw new Error("payload_too_large");
    }
    chunks.push(chunk);
  }

  if (!chunks.length) {
    return {};
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new Error("invalid_json");
  }
}

function allowMethod(request, response, allowedMethod) {
  if (request.method === allowedMethod) {
    return true;
  }

  response.setHeader("Allow", allowedMethod);
  json(response, 405, { error: "method_not_allowed" });
  return false;
}

module.exports = {
  allowMethod,
  json,
  readJson,
};
