const express = require("express");
const router = express.Router();
const { getUserActivity } = require("../controllers/activity.controllers");

router.route("/")
.get(getUserActivity);

module.exports = router;
