const fs = require("fs");
const path = require("path");
const config = require("../config");

const eventsModule = require("../modules/event");
const scheduler = require("./scheduler");

const parseDate = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hours, minutes);
};

const sortEventsByStartDate = async (eventsList) => {
  return eventsList.sort(
    (a, b) => parseDate(a.startDate) - parseDate(b.startDate)
  );
};

const configParser = async () => {
  const filePath = path.join(
    __dirname,
    `../../${config.EVENTS_CONFIG_FILE_NAME}`
  );

  const eventsConfigData = await fs.readFileSync(filePath, "utf8");

  const sortedEvents = await sortEventsByStartDate(
    JSON.parse(eventsConfigData)
  );

  await eventsModule.injectEventsToDB(sortedEvents);

  await scheduler.configureScheduler();
};

module.exports = configParser;
