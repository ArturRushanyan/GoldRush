const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const bucketSchema = new Schema({
  users: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      golds: {
        type: Number,
        default: 0,
      },
    },
  ],
  eventId: {
    type: String,
    required: true,
  },
  userTypesCount: {
    whale: {
      type: Number,
      default: 0,
    },
    dolphin: {
      type: Number,
      default: 0,
    },
    fish: {
      type: Number,
      default: 0,
    },
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

try {
  Bucket = mongoose.model("Bucket", bucketSchema);
} catch (e) {
  Bucket = mongoose.model("Bucket");
}

module.exports = Bucket;
