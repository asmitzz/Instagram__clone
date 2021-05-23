const express = require("express");
const router = express.Router();
const { signup,signin } = require("../controllers/auth.controllers");
const validateSignup = require("../validator/signup.validator");
const validateSignin = require("../validator/signin.validator");

router.route("/signup")
.post(validateSignup,signup);

router.route("/signin")
.post(validateSignin,signin);

module.exports = router;