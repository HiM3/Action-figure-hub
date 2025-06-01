const express = require("express");
const router = express.Router();
const { signup, login, logout, changePassword } = require("../controllers/authenticate.controller");
const { verifyuser } = require("../middleware/verifyuser");

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected routes
router.post("/logout", verifyuser, logout);
router.post("/change-password", verifyuser, changePassword);

module.exports = router;
