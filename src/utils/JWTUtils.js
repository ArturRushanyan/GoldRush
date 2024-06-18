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

const getAccessToken = (requestHeaders) => {
  const { authorization } = requestHeaders;
  if (!authorization) {
    return null;
  }

  // remove Bearer from token
  return authorization.startsWith("Bearer ")
    ? authorization.slice(7, authorization.length)
    : authorization;
};

const verifyToken = (token) => {
  return new Promise((resolve) => {
    resolve(JWT.verify(token, config.JWT_SECRET_KEY));
  });
};

module.exports = {
  generateAuthToken,
  getAccessToken,
  verifyToken,
};
