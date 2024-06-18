const eventModelService = require("../dbServices/eventServices");

const getCurrentActiveEvent = () => {
  return eventModelService.getCurrentActiveEvent();
};

module.exports = {
  getCurrentActiveEvent,
};
