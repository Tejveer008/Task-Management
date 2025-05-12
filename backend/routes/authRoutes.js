// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const { login, signup, getMe, logout } = require("../controllers/AuthController");
const { protect } = require("../middleware/authMiddleware");

router.post("/login", login);
router.post("/signup", signup);
router.get("/me", protect, getMe);
router.post("/logout", logout);
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.status(200).json({ user });
});

module.exports = router;
