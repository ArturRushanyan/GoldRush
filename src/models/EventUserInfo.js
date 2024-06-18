const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const eventUserInfoSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  bucketId: {
    type: String,
    required: true,
  },
  claim: {
    type: Boolean,
    default: false,
  },
  reward: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: String,
    default: moment(new Date()).format("DD-MM-YYYY"),
  },
  updatedAt: {
    type: String,
    default: moment(new Date()).format("DD-MM-YYYY"),
  },
});

let EventUserInfo = null;
try {
  EventUserInfo = mongoose.model("eventUserInfo", eventUserInfoSchema);
} catch (e) {
  EventUserInfo = mongoose.model("eventUserInfo");
}

module.exports = EventUserInfo;
