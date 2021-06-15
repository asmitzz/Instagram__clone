const express = require("express");
const router = express.Router();
const { checkSavedPost,updatePostsInSavedPost,getSavedPosts } = require("../controllers/savedpost.controllers");

router.route("/")
.get(checkSavedPost,getSavedPosts)

router.route("/:postId")
.post(checkSavedPost,updatePostsInSavedPost);

module.exports = router;