const moment = require("moment");
const eventModel = require("../models/Event");
const config = require("../config");

const getCurrentActiveEvent = async () => {
  return eventModel.findOne({ state: config.EVENT_STATE_ENUM[1] });
};

const getEventById = async (eventId) => {
  return eventModel.findOne({ _id: eventId });
};

const getFirstValidEvent = async () => {
  return eventModel.findOne({
    state: config.EVENT_STATE_ENUM[0],
    startDate: { $gt: moment().format("DD-MM-YYYY HH:mm") },
  });
};

const injectEvents = async (eventsList) => {
  await eventModel.insertMany(eventsList);
};

const updateEventStateById = async (eventId, status) => {
  return eventModel.findOneAndUpdate(
    {
      _id: eventId,
    },
    { state: status }
  );
};

const getRunningEvent = async () => {
  return eventModel.findOne({
    state: config.EVENT_STATE_ENUM[1],
  });
};

module.exports = {
  getCurrentActiveEvent,
  getEventById,
  getFirstValidEvent,
  injectEvents,
  updateEventStateById,
  getRunningEvent,
};
