require("dotenv").config();

const PORT = process.env.RUNNING_PORT || 3000;
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || "db_gold_rush";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secretKey";
const MAX_USERS_PER_BUCKET = parseInt(process.env.MAX_USERS_PER_BUCKET) || 200;
const ROLE_LIMITS = {
  whale: parseInt(process.env.ROLE_LIMITS_WHALE) || 10,
  dolphin: parseInt(process.env.ROLE_LIMITS_DOLPHIN) || 40,
  fish: parseInt(process.env.ROLE_LIMITS_FISH) || 150,
};

const EVENTS_CONFIG_FILE_NAME =
  process.env.EVENTS_CONFIG_FILE_NAME || "eventsConfig.json";

const config = {
  port: PORT,
  JWT_SECRET_KEY,
  DB: {
    url: `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  },
  USER_TYPE_ENUM: ["fish", "dolphin", "whale"],
  EVENT_STATE_ENUM: ["upcoming", "running", "ended"],
  MAX_USERS_PER_BUCKET,
  ROLE_LIMITS,
  EVENTS_CONFIG_FILE_NAME,
};

module.exports = config;
