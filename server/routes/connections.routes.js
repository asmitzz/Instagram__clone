const express = require("express");
const router = express.Router();
const { checkConnections,getFollowers,getFollowing } = require("../controllers/connection.controllers");

router.param("userId",checkConnections);

router.route("/connections/followers/:userId")
.get(getFollowers);

router.route("/connections/following/:userId")
.get(getFollowing);