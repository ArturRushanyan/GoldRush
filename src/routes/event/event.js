const express = require("express");
const eventController = require("./event.controller");
const validateWithJoi = require("../../middlewares/joiVerify");

const router = express.Router();

router.get("/event", eventController.getCurrentEvent);
router.post(
  "/report",
  validateWithJoi.ScoreReporting,
  eventController.reportScore
);
router.get(
  "/leaderboard",
  validateWithJoi.LeaderBoard,
  eventController.leaderBoard
);
router.post("/claim", validateWithJoi.Claim, eventController.claim);

module.exports = router;
