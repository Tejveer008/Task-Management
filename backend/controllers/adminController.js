const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
};

exports.assignTask = async (req, res) => {
  // You can also plug in file/image handling here
  const { task, email, dueDate, priority, userName } = req.body;

  const newTask = new Task({
    task,
    email,
    dueDate,
    priority,
    userName,
    progress: 0,
  });

  await newTask.save();
  res.status(201).json({ message: "Task assigned", task: newTask });
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndDelete(userId);
  res.json({ message: "User deleted" });
};
