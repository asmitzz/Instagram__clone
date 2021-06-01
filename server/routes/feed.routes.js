const express = require("express");
const router = express.Router();
const { getPosts } = require("../controllers/feed.controllers");

router.route("/posts")
.get(getPosts);

module.exports = router;