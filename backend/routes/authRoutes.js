const express = require("express");
const router = express.Router();
const { login, signup, getMe, logout } = require("../controllers/AuthController");
const { protect } = require("../middleware/authMiddleware");

router.get("/me", protect, getMe);
router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);

module.exports = router;
