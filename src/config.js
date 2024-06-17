require("dotenv").config();

const PORT = process.env.RUNNING_PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "db_gold_rush";

const config = {
  port: PORT,
  DB: {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
};

module.exports = config;
