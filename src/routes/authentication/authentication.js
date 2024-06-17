const express = require("express");
const authentication = require("./authentication.controller");
const validateWithJoi = require("../../middlewares/joiVerify");

const router = express.Router();

router.post("/signup", validateWithJoi.Registration, authentication.SignUp);
router.post("/login", validateWithJoi.Login, authentication.Login);

module.exports = router;
