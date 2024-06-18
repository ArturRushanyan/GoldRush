const cron = require("node-cron");
const moment = require("moment-timezone");
const eventModule = require("../modules/event");
const constMessages = require("./constMessages");
const config = require("../config");

const configureScheduler = async () => {
  const event = await eventModule.getFirstValidEvent();

  if (!event) {
    console.log(constMessages.NO_VALID_EVENTS_TO_SCHEDULE);
    return;
  }
  await eventScheduler();
};

const eventScheduler = async () => {
  let upcomingEvent = null;
  const currentRunningEvent = await eventModule.getRunningEvent();

  if (!currentRunningEvent) {
    upcomingEvent = await eventModule.getFirstValidEvent();
  }

  const targetMoment = moment.tz(
    (upcomingEvent && upcomingEvent.startDate) || currentRunningEvent.endDate,
    "DD-MM-YYYY HH:mm",
    moment.tz.guess()
  );

  // Extract the components needed for the cron expression
  const targetMinute = targetMoment.minute();
  const targetHour = targetMoment.hour();
  const targetDayOfMonth = targetMoment.date();
  const targetMonth = targetMoment.month() + 1; // Cron months are 1-based (1-12)

  // Construct the cron expression
  const cronExpression = `${targetMinute} ${targetHour} ${targetDayOfMonth} ${targetMonth} *`;

  console.log("cronExpression =>>", cronExpression);

  const status = upcomingEvent
    ? config.EVENT_STATE_ENUM[1]
    : config.EVENT_STATE_ENUM[2];

  if (upcomingEvent !== null) {
    eventId = upcomingEvent._id;
  } else {
    eventId = currentRunningEvent._id;
  }

  cron.schedule(
    cronExpression,
    async () => {
      console.log(
        `Cron job started at: ${moment().format("YYYY-MM-DD HH:mm:ss")}`
      );
      await eventModule.updateEventStateById(eventId, status);
      await eventScheduler();
    },
    {
      scheduled: true,
      timezone: moment.tz.guess(),
    }
  );
};

module.exports = {
  configureScheduler,
};
