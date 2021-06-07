const express = require("express");
const router = express.Router();
const {
  checkConnections,
  getFollowers,
  getFollowing,
  updateConnections
} = require("../controllers/connection.controllers");

router.route("/:userId").post(updateConnections);

router.param("userId", checkConnections);

router.route("/followers/:userId").get(getFollowers);

router.route("/following/:userId").get(getFollowing);

module.exports = router;
