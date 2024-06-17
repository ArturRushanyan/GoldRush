const userModelService = require("../dbServices/userServices");

const findUserByEmail = async (email) => {
  return userModelService.findUserByEmail(email);
};

const saveUser = (newUserData) => {
  return userModelService.saveUser(newUserData);
};

module.exports = {
  findUserByEmail,
  saveUser,
};
