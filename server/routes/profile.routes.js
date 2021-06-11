const express = require("express");
const router = express.Router();
const { getUserProfile,getViewProfile,updateProfile } = require("../controllers/profile.controllers");
router.route("/")
.get(getUserProfile);

router.route("/:userId")
.get(getViewProfile);

router.route("/update").post(updateProfile);

module.exports = router;