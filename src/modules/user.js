const userModelService = require("../dbServices/userServices");

const findUserByEmail = async (email) => {
  return userModelService.findUserByEmail(email);
};

const saveUser = (newUserData) => {
  return userModelService.saveUser(newUserData);
};

const getUserById = (id) => {
  return userModelService.getUserById(id);
};

module.exports = {
  findUserByEmail,
  saveUser,
  getUserById,
};
