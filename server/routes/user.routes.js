const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/user.controllers");

router.route("/:search").get(getUsers);

module.exports = router;