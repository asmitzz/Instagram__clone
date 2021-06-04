const express = require("express");
const router = express.Router();
const { getUserProfile } = require("../controllers/profile.controllers");

router.route("/profile")
.get(getUserProfile);

module.exports = router;