const eventModelService = require("../dbServices/eventServices");
const constMessages = require("../utils/constMessages");
const config = require("../config");

const getCurrentActiveEvent = () => {
  return eventModelService.getCurrentActiveEvent();
};

const isEventActive = async (eventId) => {
  const event = await eventModelService.getEventById(eventId);

  if (!event) {
    throw { status: 404, message: constMessages.EVENT_NOT_FOUND };
  }
  if (event.state !== config.EVENT_STATE_ENUM[1]) {
    return false;
  }

  return true;
};

const getRunningEventAndUpdateState = async () => {
  return eventModelService.getRunningEventAndUpdateState();
};

const injectEventsToDB = async (eventsList) => {
  await eventModelService.injectEvents(eventsList);
};

const updateEventStateById = async (eventId, status) => {
  return eventModelService.updateEventStateById(eventId, status);
};

const getUpcomingEventAndUpdateState = async () => {
  return eventModelService.getUpcomingEventAndUpdateState();
};

module.exports = {
  getCurrentActiveEvent,
  isEventActive,
  injectEventsToDB,
  updateEventStateById,
  getRunningEventAndUpdateState,
  getUpcomingEventAndUpdateState,
};
