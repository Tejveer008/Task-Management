// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const Task = require("../models/Task");

const {
  createTask,
  getAllTasks,
  getUserTasks,
} = require("../controllers/taskController");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a new task
router.post(
  "/",
  protect,
  isAdmin,
  upload.fields([{ name: "file", maxCount: 1 }, { name: "image", maxCount: 1 }]),
  createTask
);

// Get all tasks
router.get("/", protect, isAdmin, getAllTasks);

// Get user tasks
router.get("/user/:email", protect, getUserTasks);

// Delete a task
router.delete("/:taskId", protect, isAdmin, async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a task (Admin-only for full updates)
router.put(
  "/:taskId",
  protect,
  isAdmin,
  upload.fields([{ name: "file", maxCount: 1 }, { name: "image", maxCount: 1 }]),
  async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const { task, email, dueDate, priority, userName } = req.body;

      const normalizedPriority = priority ? priority.toLowerCase() : "low";

      const updatedTaskData = {
        task,
        email,
        dueDate,
        priority: normalizedPriority,
        userName,
      };

      if (req.files && req.files.file) {
        updatedTaskData.fileUrl = `/uploads/${req.files.file[0].filename}`;
      }
      if (req.files && req.files.image) {
        updatedTaskData.imageUrl = `/uploads/${req.files.image[0].filename}`;
      }

      const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true });
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json(updatedTask);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
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