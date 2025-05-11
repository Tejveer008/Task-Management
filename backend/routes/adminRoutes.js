// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, assignTask, deleteUser } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/users", protect, isAdmin, getAllUsers);
router.post("/assign-task", protect, isAdmin, assignTask);
router.delete("/user/:id", protect, isAdmin, deleteUser);

module.exports = router;
