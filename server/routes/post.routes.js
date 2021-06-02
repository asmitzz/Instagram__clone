const express = require("express");
const router = express.Router();
const { checkPost,getPosts,uploadPost,updateLikesOnPost } = require("../controllers/post.controllers");

router.param("postId",checkPost)

router.route("/posts")
.get(getPosts)
.post(uploadPost);

router.route("/posts/:postId/:userId")
.post(checkPost,updateLikesOnPost);

module.exports = router;