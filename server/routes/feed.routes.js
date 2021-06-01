const express = require("express");
const router = express.Router();
const { getFeeds } = require("../controllers/feed.controllers");

router.route("/feeds")
.get(getFeeds);

module.exports = router;