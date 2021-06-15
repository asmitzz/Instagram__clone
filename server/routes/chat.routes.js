const express = require("express");
const { createChat,getAllChats,sendmessage } = require("../controllers/chat.controllers");
const router = express.Router();

router.route("/")
.get(getAllChats);

router.route("/:userId")
.post(createChat);

router.route("/message/:chatId")
.post(sendmessage);

module.exports = router;