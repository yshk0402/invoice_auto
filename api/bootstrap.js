"use strict";

const { DEMO_USERS, publicUser } = require("../lib/demo-users");
const { json, allowMethod } = require("../lib/http");
const { missingGoogleConfig } = require("../lib/google");

module.exports = async function handler(request, response) {
  if (!allowMethod(request, response, "GET")) {
    return;
  }

  const missing = missingGoogleConfig();

  json(response, 200, {
    users: DEMO_USERS.map(publicUser),
    googleSync: {
      enabled: true,
      ready: missing.length === 0,
      missing,
    },
  });
};
