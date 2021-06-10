const express = require("express");
const router = express.Router();
const { getUsers,updateUser } = require("../controllers/user.controllers");

router.route("/:search").get(getUsers);
router.route("/")
.post(updateUser)

module.exports = router;