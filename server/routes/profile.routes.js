const express = require("express");
const router = express.Router();
const { getUserProfile,getViewProfile } = require("../controllers/profile.controllers");

router.route("/profile")
.get(getUserProfile);

router.route("/profile/:userId")
.get(getViewProfile)

module.exports = router;