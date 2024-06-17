const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");

const config = require("./config");
const errorHandler = require("./errorHandler/errorHandler");
const routes = require("../src/routes/index");

const startServer = async (app) => {
  try {
    app.use(logger("dev"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    await mongoose.connect(config.DB.url);

    routes(app);

    app.use(errorHandler);

    app.listen(config.port, () => {
      console.log(`Server is up on port: ${config.port}`);
    });
  } catch (error) {
    console.log("Server is not running:", error);
  }
};

module.exports = startServer;
