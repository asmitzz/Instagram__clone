const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const { checkPost,getPosts,getCommentsOnPosts,uploadPost,updateLikesOnPost,updateCommentsOnPost } = require("../controllers/post.controllers");

router.param("postId",checkPost)

router.route("/posts")
.get(getPosts)
.post(uploadPost);

router.route("/posts/:postId/like")
.post(checkPost,updateLikesOnPost);

router.route("/posts/:postId/comment")
.post(checkPost,check("comment","comment should be at least 1 character").isLength({ min:1 }),updateCommentsOnPost)

router.route("/posts/:postId/comment")
.get(checkPost,getCommentsOnPosts)

module.exports = router;