const express = require("express");
const eventController = require("./event.controller");

const router = express.Router();

router.get("/event", eventController.getCurrentEvent);

module.exports = router;
