const userModule = require("../../modules/user");
const constMessages = require("../../utils/constMessages");
const hash = require("../../utils/hashingHelper");
const helper = require("../../utils/helper");
const jwtUtils = require("../../utils/JWTUtils");

const SignUp = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await userModule.findUserByEmail(data.email);

    if (user) {
      throw { status: 409, message: constMessages.ALREADY_EXISTS("User") };
    }

    const hashedPassword = await hash.hasPassword(data.password);
    const userInstance = helper.prepareUserInstance(data, hashedPassword);
    const createdUser = await userModule.saveUser(userInstance);

    if (!createdUser) {
      throw { status: 500, message: constMessages.SOMETHING_WENT_WRONG };
    }

    const authToken = await jwtUtils.generateAuthToken(createdUser._id);

    return res.status(200).json({
      data: {
        success: true,
        user: createdUser,
        access_token: authToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  SignUp,
};
