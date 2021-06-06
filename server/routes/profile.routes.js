const express = require("express");
const router = express.Router();
const { getUserProfile,getViewProfile } = require("../controllers/profile.controllers");

router.route("/")
.get(getUserProfile);

router.route("/:userId")
.get(getViewProfile)

module.exports = router;