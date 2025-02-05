const express = require("express");
const router = express.Router();
const verifyJWT = require("../middleware/verifyToken.js");

const authController = require("../controllers/authController.js")

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/user", verifyJWT, authController.user);

module.exports = router;