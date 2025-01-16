const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authController = require("../controllers/authController.js")

router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;