// taskController.js
const Task = require("../models/Task");
const cloudinary = require("../config/cloudinary"); // Add Cloudinary for file uploads

// GET /api/tasks - Admin: Get tasks created by the logged-in admin
exports.getTasksByAdmin = async (req, res) => {
  try {
    const adminId = req.user.id; // Get the admin's ID from the authenticated user
    const tasks = await Task.find({ createdBy: adminId }); // Fetch tasks created by this admin
    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// GET /api/tasks/user/:email - User: Get tasks assigned to this email
exports.getUserTasks = async (req, res) => {
  const { email } = req.params;
  try {
    const tasks = await Task.find({ email });
    res.status(200).json({ projects: tasks });
  } catch (err) {
    console.error("Fetch user tasks error:", err);
    res.status(500).json({ message: "Failed to fetch user tasks" });
  }
};

// POST /api/tasks - Admin: Create a new task
exports.createTask = async (req, res) => {
  try {
    const { task, email, dueDate, priority, userName } = req.body;
    const adminId = req.user.id; // Get the admin's ID from the authenticated user

    if (!task || !email || !dueDate || !priority || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = {
      task,
      email,
      dueDate,
      priority,
      userName,
      progress: 0,
      createdBy: adminId, // Associate the task with the admin
    };

    // Upload image if provided
    if (req.files?.image) {
      const result = await cloudinary.uploader.upload(req.files.image[0].path);
      newTask.imageUrl = result.secure_url;
    }

    // Upload document if provided
    if (req.files?.file) {
      const result = await cloudinary.uploader.upload(req.files.file[0].path, {
        resource_type: "raw",
      });
      newTask.fileUrl = result.secure_url;
    }

    const createdTask = await Task.create(newTask);
    res.status(201).json({ message: "Task assigned", task: createdTask });
  } catch (err) {
    console.error("Create Task Error:", err);
    res.status(500).json({ message: "Failed to assign task" });
  }
};

// PUT /api/tasks/:taskId - Admin: Update a task
// taskController.js (updateTask only)
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const adminId = req.user.id;
    console.log(`[${new Date().toISOString()}] Updating task ${taskId} for admin ${adminId}`);

    // Validate task ID format
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      console.error(`[${new Date().toISOString()}] Invalid task ID format: ${taskId}`);
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    // Find the task, ensuring it belongs to the admin
    const task = await Task.findOne({ _id: taskId, createdBy: adminId });
    if (!task) {
      console.error(`[${new Date().toISOString()}] Task ${taskId} not found or admin ${adminId} not authorized`);
      return res.status(404).json({ message: "Task not found or not authorized" });
    }

    // Update task fields
    const { task: taskName, email, dueDate, priority, userName } = req.body;
    console.log(`[${new Date().toISOString()}] Received update data:`, { taskName, email, dueDate, priority, userName });

    // Validate required fields
    if (!taskName || !email || !dueDate || !priority || !userName) {
      console.error(`[${new Date().toISOString()}] Missing required fields for task update`);
      return res.status(400).json({ message: "All fields (task, email, dueDate, priority, userName) are required" });
    }

    task.task = taskName || task.task;
    task.email = email || task.email;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.userName = userName || task.userName;

    // Handle file/image uploads if provided
    if (req.files && req.files.image) {
      if (!req.files.image[0] || !req.files.image[0].path) {
        console.error(`[${new Date().toISOString()}] Invalid image file:`, req.files.image);
        return res.status(400).json({ message: "Invalid image file provided" });
      }
      try {
        console.log(`[${new Date().toISOString()}] Uploading image to Cloudinary:`, req.files.image[0].path);
        const result = await cloudinary.uploader.upload(req.files.image[0].path);
        task.imageUrl = result.secure_url;
        console.log(`[${new Date().toISOString()}] Image uploaded: ${task.imageUrl}`);
      } catch (uploadErr) {
        console.error(`[${new Date().toISOString()}] Cloudinary image upload failed:`, uploadErr.message);
        return res.status(500).json({ message: "Failed to upload image to Cloudinary: " + uploadErr.message });
      }
    }
    if (req.files && req.files.file) {
      if (!req.files.file[0] || !req.files.file[0].path) {
        console.error(`[${new Date().toISOString()}] Invalid file:`, req.files.file);
        return res.status(400).json({ message: "Invalid file provided" });
      }
      try {
        console.log(`[${new Date().toISOString()}] Uploading file to Cloudinary:`, req.files.file[0].path);
        const result = await cloudinary.uploader.upload(req.files.file[0].path, {
          resource_type: "raw",
        });
        task.fileUrl = result.secure_url;
        console.log(`[${new Date().toISOString()}] File uploaded: ${task.fileUrl}`);
      } catch (uploadErr) {
        console.error(`[${new Date().toISOString()}] Cloudinary file upload failed:`, uploadErr.message);
        return res.status(500).json({ message: "Failed to upload file to Cloudinary: " + uploadErr.message });
      }
    }

    // Save the updated task
    await task.save();
    console.log(`[${new Date().toISOString()}] Task ${taskId} updated successfully`);

    res.status(200).json({ message: "Task updated", task });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Update Task Error:`, err.message);
    res.status(500).json({ message: "Failed to update task: " + err.message });
  }
};

// DELETE /api/tasks/:taskId - Admin: Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const adminId = req.user.id;
    const task = await Task.findOneAndDelete({ _id: taskId, createdBy: adminId });
    if (!task) return res.status(404).json({ message: "Task not found or not authorized" });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Delete Task Error:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};