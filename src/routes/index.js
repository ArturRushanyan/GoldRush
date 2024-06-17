const Authentication = require("./authentication/authentication");

const indexRoutes = (app) => {
  app.use("/api/v1/auth", Authentication);
};

module.exports = indexRoutes;
