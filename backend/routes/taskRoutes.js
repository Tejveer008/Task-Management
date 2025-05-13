// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Use the same middleware as adminRoutes.js
const Task = require("../models/Task");

const {
  getTasksByAdmin,
  getUserTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Create a new task
router.post(
  "/",
  protect,
  isAdmin,
  upload.fields([{ name: "file", maxCount: 2 }, { name: "image", maxCount: 2 }]),
  createTask
);

// Get tasks for the logged-in admin
router.get("/", protect, isAdmin, getTasksByAdmin);

// Get user tasks
router.get("/user/:email", protect, getUserTasks);

// Delete a task
router.delete("/:taskId", protect, isAdmin, deleteTask);

// Update a task (Admin-only for full updates)
router.put(
  "/:taskId",
  protect,
  isAdmin,
  upload.fields([{ name: "file", maxCount: 1 }, { name: "image", maxCount: 1 }]),
  updateTask
);

// Route for users to update task progress
router.put("/progress/:taskId", protect, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { progress } = req.body;

    // Use req.user from the protect middleware to get the user's email
    const userEmail = req.user.email; // Assuming protect middleware sets req.user

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.email !== userEmail) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { progress: Number(progress) },
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;