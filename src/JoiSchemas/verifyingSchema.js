const Joi = require("joi");
const config = require("../config");

module.exports = {
  SignUp: Joi.object().keys({
    name: Joi.string().required().min(5).max(40),
    surname: Joi.string().required().min(5).max(40).trim(),
    user_type: Joi.string().valid(...config.USER_TYPE_ENUM),
    email: Joi.string().required().min(5).max(40).trim(),
    password: Joi.string().required().min(6).max(20).trim(),
    confirmPassword: Joi.ref("password"),
  }),
  Login: Joi.object().keys({
    email: Joi.string().required().min(5).max(40).trim(),
    password: Joi.string().required().min(6).max(20).trim(),
  }),
  ScoreReporting: Joi.object().keys({
    eventId: Joi.string().required(),
    goldCount: Joi.number().required(),
  }),
  LeaderBoard: Joi.object().keys({
    eventId: Joi.string().required(),
  }),
  Claim: Joi.object().keys({
    eventId: Joi.string().required(),
  }),
};
