const express = require("express");
const {check} = require("express-validator");
const router = express.Router();
const { checkPost,getPosts,getCommentsOfPost,uploadPost,updateLikesOnPost,updateCommentsOnPost } = require("../controllers/post.controllers");

router.param("postId",checkPost)

router.route("/")
.get(getPosts)
.post(uploadPost);

router.route("/:postId/like")
.post(checkPost,updateLikesOnPost);

router.route("/:postId/comment")
.post(checkPost,check("comment","comment should be at least 1 character").isLength({ min:1 }),updateCommentsOnPost)

router.route("/:postId/comment")
.get(checkPost,getCommentsOfPost)

module.exports = router;