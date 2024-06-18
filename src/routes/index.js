const Authentication = require("./authentication/authentication");
const Event = require("./event/event");

const authentication = require("../middlewares/isAuthenticated");

const indexRoutes = (app) => {
  app.use("/api/v1/auth", Authentication);
  app.use("/api/v1/events", authentication.isAuthenticated, Event);
};

module.exports = indexRoutes;
