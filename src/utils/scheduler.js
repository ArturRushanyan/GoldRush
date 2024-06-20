const cron = require("node-cron");
const moment = require("moment-timezone");
const eventModule = require("../modules/event");
const config = require("../config");

const configureScheduler = async () => {
  let eventId = null;
  let upcomingEvent = null;
  const currentRunningEvent = await eventModule.getRunningEventAndUpdateState();

  if (!currentRunningEvent) {
    upcomingEvent = await eventModule.getUpcomingEventAndUpdateState();
  }

  if (!currentRunningEvent && !upcomingEvent) {
    return;
  }

  const targetMoment = moment.tz(
    (upcomingEvent && upcomingEvent.startDate) || currentRunningEvent.endDate,
    "DD-MM-YYYY HH:mm:ss",
    moment.tz.guess()
  );

  // Extract the components needed for the cron expression
  const targetSeconds = targetMoment.second();
  const targetMinute = targetMoment.minute();
  const targetHour = targetMoment.hour();
  const targetDayOfMonth = targetMoment.date();
  const targetMonth = targetMoment.month() + 1; // Cron months are 1-based (1-12)

  // Construct the cron expression
  const cronExpression = `${targetSeconds} ${targetMinute} ${targetHour} ${targetDayOfMonth} ${targetMonth} *`;

  console.log("cronExpression: ", cronExpression);

  const status = upcomingEvent
    ? config.EVENT_STATE_ENUM[1]
    : config.EVENT_STATE_ENUM[2];

  if (upcomingEvent) {
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
      setTimeout(() => {
        configureScheduler();
      }, 2000);
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
