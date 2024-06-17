const Schema = require("../JoiSchemas/verifyingSchema");
const constMessages = require("../utils/constMessages");
const manipulateData = require("../utils/helper");

const Registration = (req, res, next) => {
  const schema = Schema.SignUp;
  if (req.body.password !== req.body.confirmPassword) {
    throw { status: 422, message: constMessages.PASSWORDS_NOT_MATCH };
  }
  const result = schema.validate(req.body);

  if (result.error) {
    throw { status: 422, message: result.error.details };
  }

  req.body = manipulateData.prepareUserData(req.body, result.value);
  next();
};

module.exports = {
  Registration,
};
