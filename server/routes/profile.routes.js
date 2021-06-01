const express = require("express");
const router = express.Router();
const { checkUserProfile,getUserProfile } = require("../controllers/profile.controllers");

router.param("userId",checkUserProfile);

router.route("/profile/:userId")
.get(getUserProfile);

module.exports = router;