// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { login, signup, getMe, logout } = require("../controllers/AuthController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", protect, getMe);
router.post("/logout", logout);

module.exports = router;
