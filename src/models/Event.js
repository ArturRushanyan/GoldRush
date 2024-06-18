const mongoose = require("mongoose");
const moment = require("moment");
const config = require("../config");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: config.EVENT_STATE_ENUM,
    default: config.EVENT_STATE_ENUM[0],
  },
  name: {
    type: String,
    required: true,
  },
  bucket: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bucket",
    },
  ],
  createdAt: {
    type: String,
    default: moment(new Date()).format("DD-MM-YYYY"),
  },
  updatedAt: {
    type: String,
    default: moment(new Date()).format("DD-MM-YYYY"),
  },
});

let Event = null;
try {
  Event = mongoose.model("Event", eventSchema);
} catch (e) {
  Event = mongoose.model("Event");
}

module.exports = Event;
