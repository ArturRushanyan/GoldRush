const userModel = require("../models/User");

const findUserByEmail = async (email) => {
  return userModel.findOne({ email });
};

const saveUser = async (newUserData) => {
  let user = new userModel(newUserData);
  return user.save();
};

module.exports = {
  findUserByEmail,
  saveUser,
};
