const JWT = require("jsonwebtoken");
const config = require("../config");
const constMessages = require("./constMessages");

const generateAuthToken = (userId) => {
  return new Promise((resolve, reject) => {
    if (!userId) {
      const err = {
        status: 400,
        message: constMessages.MISSING_USER_ID,
      };
      reject(err);
    }
    resolve(
      JWT.sign({ _id: userId }, config.JWT_SECRET_KEY, { expiresIn: "1h" })
    );
  });
};

module.exports = {
  generateAuthToken,
};
