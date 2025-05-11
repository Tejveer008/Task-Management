// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { getUserTasks, getAllTasks, updateTask } = require("../controllers/taskController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/user/:email", protect, getUserTasks);
router.get("/", protect, isAdmin, getAllTasks);
router.put("/:id", protect, updateTask);

module.exports = router;
