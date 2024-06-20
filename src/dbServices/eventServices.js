const moment = require("moment");
const eventModel = require("../models/Event");
const config = require("../config");

const getCurrentActiveEvent = async () => {
  return eventModel.findOne({ state: config.EVENT_STATE_ENUM[1] });
};

const getEventById = async (eventId) => {
  return eventModel.findOne({ _id: eventId });
};

const getRunningEventAndUpdateState = async () => {
  const now = moment().format("DD/MM/YYYY HH:mm:ss");
  return eventModel.findOneAndUpdate(
    {
      startDate: { $lte: now },
      endDate: { $gte: now },
    },
    {
      state: config.EVENT_STATE_ENUM[1],
    },
    { new: true }
  );
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

const getUpcomingEventAndUpdateState = async () => {
  const now = moment().format("DD/MM/YYYY HH:mm:ss");
  return eventModel.findOne({
    startDate: { $gt: now },
  });
};

module.exports = {
  getCurrentActiveEvent,
  getEventById,
  injectEvents,
  updateEventStateById,
  getRunningEventAndUpdateState,
  getUpcomingEventAndUpdateState,
};
