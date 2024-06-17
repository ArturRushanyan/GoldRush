const express = require("express");
const authentication = require("./authentication.controller");
const validateWithJoi = require("../../middlewares/joiVerify");

const router = express.Router();

router.post("/signup", validateWithJoi.Registration, authentication.SignUp);

module.exports = router;
