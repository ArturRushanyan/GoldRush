const mongoose = require("mongoose");
const moment = require("moment");
const config = require("../config");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  user_type: {
    type: String,
    enum: config.USER_TYPE_ENUM,
    default: config.USER_TYPE_ENUM[0],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  bucket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bucket",
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

let User = null;
try {
  User = mongoose.model("User", userSchema);
} catch (e) {
  User = mongoose.model("User");
}

module.exports = User;
