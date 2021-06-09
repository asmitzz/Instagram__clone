const express = require("express");
const { checkChat,accessChat,getAllChats,sendmessage } = require("../controllers/chat.controllers");
const router = express.Router();

router.param("userId",checkChat)

router.route('/:userId')
.get(accessChat)

router.route("/")
.get(getAllChats);

router.route("/message/:chatId")
.post(sendmessage);

module.exports = router;