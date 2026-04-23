"use strict";

const DEMO_USERS = [
  { employee_id: "id1", password: "pass1", user_name: "Demo User 1", role: "Employee", preferred_language: "ja", active: "true" },
  { employee_id: "id2", password: "pass2", user_name: "Demo User 2", role: "Employee", preferred_language: "en", active: "true" },
  { employee_id: "id3", password: "pass3", user_name: "Demo User 3", role: "ForeignWorker", preferred_language: "zh", active: "true" },
  { employee_id: "id4", password: "pass4", user_name: "Demo User 4", role: "ForeignWorker", preferred_language: "vi", active: "true" },
  { employee_id: "id5", password: "pass5", user_name: "Demo User 5", role: "Employee", preferred_language: "ja", active: "true" },
].map((user) => ({ ...user, sheet_tab_name: `USER_${user.employee_id}` }));

const CATEGORY_OPTIONS = ["transportation", "meal", "supplies", "lodging", "communication", "other"];

function publicUser(user) {
  return {
    employee_id: user.employee_id,
    password: user.password,
    user_name: user.user_name,
    role: user.role,
    preferred_language: user.preferred_language,
    sheet_tab_name: user.sheet_tab_name,
  };
}

function authenticatedUser(user) {
  return {
    employee_id: user.employee_id,
    user_name: user.user_name,
    role: user.role,
    preferred_language: user.preferred_language,
    sheet_tab_name: user.sheet_tab_name,
  };
}

module.exports = {
  CATEGORY_OPTIONS,
  DEMO_USERS,
  authenticatedUser,
  publicUser,
};
