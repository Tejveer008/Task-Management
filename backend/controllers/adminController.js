const User = require("../models/User");
const Task = require("../models/Task");
const cloudinary = require("../utils/cloudinary"); // If you handle file/image uploads

// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// POST /api/admin/assign-task
exports.assignTask = async (req, res) => {
  try {
    const { task, email, dueDate, priority, userName } = req.body;
    const newTask = {
      task,
      email,
      dueDate,
      priority,
      userName,
      progress: 0,
    };

    // Upload image if provided
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path);
      newTask.imageUrl = result.secure_url;
    }

    // Upload document if provided
    if (req.files?.file) {
      const result = await cloudinary.uploader.upload(req.files.file[0].path, {
        resource_type: "raw", // for .pdf/.docx
      });
      newTask.fileUrl = result.secure_url;
    }

    const createdTask = await Task.create(newTask);
    res.status(201).json({ message: "Task assigned", task: createdTask });
  } catch (err) {
    console.error("Assign Task Error:", err);
    res.status(500).json({ message: "Failed to assign task" });
  }
};


// DELETE /api/admin/user/:id
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deleted = await User.findByIdAndDelete(userId);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
