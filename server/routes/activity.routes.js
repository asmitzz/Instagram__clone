const express = require("express");
const router = express.Router();
const { getUserActivity,confirmFollowRequest,deleteFollowRequest } = require("../controllers/activity.controllers");

router.route("/").get(getUserActivity);

router.route("/requests/:userId")
.post(confirmFollowRequest)
.delete(deleteFollowRequest);

module.exports = router;
