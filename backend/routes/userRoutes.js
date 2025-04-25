// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../Models/User");

// GET /api/users/:id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
