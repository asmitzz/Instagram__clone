const express = require("express");
const router = express.Router();
const { checkConnections,getFollowers,getFollowing } = require("../controllers/connection.controllers");

router.param("userId",checkConnections);

router.route("/followers/:userId")
.get(getFollowers);

router.route("/following/:userId")
.get(getFollowing);

module.exports = router;