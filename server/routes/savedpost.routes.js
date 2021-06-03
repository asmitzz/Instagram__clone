const express = require("express");
const router = express.Router();
const { checkSavedPost,updatePostsInSavedPost,getSavedPosts } = require("../controllers/savedpost.controllers");

router.route("/savedposts")
.get(checkSavedPost,getSavedPosts)

router.route("/savedposts/:postId")
.post(checkSavedPost,updatePostsInSavedPost);

module.exports = router;