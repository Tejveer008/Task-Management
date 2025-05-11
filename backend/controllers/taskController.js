const Task = require("../models/Task");

exports.getUserTasks = async (req, res) => {
  const email = req.params.email;
  const tasks = await Task.find({ email });
  res.json({ projects: tasks });
};

exports.getAllTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json({ tasks });
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const updated = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  res.json({ message: "Task updated", task: updated });
};
