// Error Messages

module.exports = {
  VALIDATION_ERROR: "Couldn't pass validation",
  PASSWORDS_NOT_MATCH: "Passwords did not match",
  SOMETHING_WENT_WRONG: "Something went wrong",
  MISSING_USER_ID: "Missing user's id",
  INCORRECT_PASSWORD: "Wrong user name or password",
  CANNOT_FIND_USER: "Can not find user",
  NO_ACTIVE_EVENTS: "No active events",
  MISSING_TOKEN: "Missing Auth token",
  EVENT_NOT_FOUND: "Event not found",
  NOT_PARTICIPATED_TO_EVENT: "Not participated to event",
  EVENT_IS_ACTIVE_CANNOT_CLAIM:
    "Event is currently active and you are unable to make a claim",
  CLAIM_ALREADY_DONE: "Claim has already been processed",
  NO_VALID_EVENTS_TO_SCHEDULE: "There are no valid events to schedule.",
  ALREADY_EXISTS: (resource) => `${resource} already exists`,
  NOT_EXISTS: (resource) => `${resource} doesn't exist!`,
};
