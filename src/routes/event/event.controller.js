const eventModule = require("../../modules/event");
const constMessages = require("../../utils/constMessages");

const getCurrentEvent = async (req, res, next) => {
  const { user } = req;

  try {
    const activeEvent = await eventModule.getCurrentActiveEvent();

    if (!activeEvent) {
      return res.status(200).json({ message: constMessages.NO_ACTIVE_EVENTS });
    }

    return res.status(200).json({
      data: {
        _id: activeEvent._id,
        state: activeEvent.state,
        endDate: activeEvent.endDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentEvent,
};
