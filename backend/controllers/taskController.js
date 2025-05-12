const Task = require("../models/Task"); // Replace with your Mongoose model if using MongoDB

// GET /api/tasks - Admin: Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find(); // or from your mock/in-memory store
    res.status(200).json({ tasks });
  } catch (err) {
    console.error("Fetch all tasks error:", err);
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

    if (!task || !email || !dueDate || !priority || !userName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTask = new Task({
      task,
      email,
      dueDate,
      priority,
      userName,
      progress: 0,
      fileUrl: req.files?.file?.[0]?.path || null,
      imageUrl: req.files?.image?.[0]?.path || null,
    });

    await newTask.save(); // If using Mongoose

    res.status(201).json({ message: "Task created", task: newTask });
  } catch (err) {
    console.error("Create task error:", err);
    res.status(500).json({ message: "Failed to create task" });
  }
};
