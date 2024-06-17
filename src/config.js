require("dotenv").config();

const PORT = process.env.RUNNING_PORT || 3000;

const config = {
    port: PORT,
};

module.exports = config;