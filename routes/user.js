const express = require("express");
const router = express.Router();
const { handleNewUser, handleLoginUser } = require("../controllers/user");

router.post("/", handleNewUser);
router.post("/login", handleLoginUser);

module.exports = router;
