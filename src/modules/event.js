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

const getFirstValidEvent = async () => {
  return eventModelService.getFirstValidEvent();
};

const injectEventsToDB = async (eventsList) => {
  await eventModelService.injectEvents(eventsList);
};

const updateEventStateById = async (eventId, status) => {
  return eventModelService.updateEventStateById(eventId, status);
};

const getRunningEvent = async () => {
  return eventModelService.getRunningEvent();
};

module.exports = {
  getCurrentActiveEvent,
  isEventActive,
  getFirstValidEvent,
  injectEventsToDB,
  updateEventStateById,
  getRunningEvent,
};
