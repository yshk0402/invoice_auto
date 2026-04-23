"use strict";

const { DEMO_USERS, authenticatedUser } = require("../lib/demo-users");
const { json, allowMethod, readJson } = require("../lib/http");

module.exports = async function handler(request, response) {
  if (!allowMethod(request, response, "POST")) {
    return;
  }

  try {
    const body = await readJson(request);
    const user = DEMO_USERS.find(
      (item) => item.employee_id === body.employeeId && item.password === body.password
    );

    if (!user) {
      json(response, 401, { error: "invalid_credentials" });
      return;
    }

    json(response, 200, { user: authenticatedUser(user) });
  } catch (error) {
    json(response, 400, { error: error.message || "invalid_request" });
  }
};
