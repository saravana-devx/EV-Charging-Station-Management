const express = require("express");

const { loginUser, registerUser } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/login-user", loginUser);
router.post("/register-user", registerUser);

module.exports = router;
