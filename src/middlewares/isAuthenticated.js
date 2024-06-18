const jwtUtils = require("../utils/JWTUtils");
const constMessages = require("../utils/constMessages");
const userModule = require("../modules/user");

const isAuthenticated = async (req, res, next) => {
  const token = jwtUtils.getAccessToken(req.headers);
  if (token !== undefined && token !== null) {
    try {
      const payload = await jwtUtils.verifyToken(token);
      const user = await userModule.getUserById(payload._id);
      if (!user) {
        throw { status: 404, message: constMessages.CANNOT_FIND_USER };
      }
      req.user = user;
      next();
    } catch (error) {
      next({ status: error.status || 400, message: error.message });
    }
  } else {
    next({ status: 403, message: constMessages.MISSING_TOKEN });
  }
};

module.exports = {
  isAuthenticated,
};
