// Error Messages

module.exports = {
  VALIDATION_ERROR: "Couldn't pass validation",
  PASSWORDS_NOT_MATCH: "Passwords did not match",
  SOMETHING_WENT_WRONG: "Something went wrong",
  MISSING_USER_ID: "Missing user's id",
  ALREADY_EXISTS: (resource) => `${resource} already exists`,
};
