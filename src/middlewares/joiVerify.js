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

const Login = (req, res, next) => {
  const schema = Schema.Login;
  const result = schema.validate(req.body);
  if (result.error) {
    throw { status: 422, message: constMessages.VALIDATION_ERROR };
  }

  req.body.email = result.value.email;
  req.body.password = result.value.password;
  next();
};

const ScoreReporting = (req, res, next) => {
  const schema = Schema.ScoreReporting;
  const result = schema.validate(req.body);

  if (result.error) {
    throw { status: 422, message: constMessages.VALIDATION_ERROR };
  }

  next();
};

const LeaderBoard = (req, res, next) => {
  const schema = Schema.LeaderBoard;
  const result = schema.validate(req.body);

  if (result.error) {
    throw { status: 422, message: constMessages.VALIDATION_ERROR };
  }

  next();
};

const Claim = (req, res, next) => {
  const schema = Schema.Claim;
  const result = schema.validate(req.body);

  if (result.error) {
    throw { status: 422, message: constMessages.VALIDATION_ERROR };
  }

  next();
};

module.exports = {
  Registration,
  Login,
  ScoreReporting,
  LeaderBoard,
  Claim,
};
