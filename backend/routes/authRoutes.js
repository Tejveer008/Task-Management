// authRoutes.js
const express = require("express");
const router = express.Router();
const { signup, login, getMe, updateProfile, logout } = require("../controllers/AuthController");
const { protect } = require("../middleware/authMiddleware");
const { profile, validateProfileUpdate } = require("../middleware/profileMiddleware"); // Import profile middleware

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/update-profile", protect, profile.single("profilePhoto"), validateProfileUpdate, updateProfile); // Add middleware chain
router.post("/logout", logout);

module.exports = router;