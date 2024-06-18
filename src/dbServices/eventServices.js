const eventModel = require("../models/Event");
const config = require("../config");

const getCurrentActiveEvent = async () => {
  return eventModel.findOne({ state: config.EVENT_STATE_ENUM[1] });
};

const getEventById = async (eventId) => {
  return eventModel.findOne({ _id: eventId });
};

module.exports = {
  getCurrentActiveEvent,
  getEventById,
};
