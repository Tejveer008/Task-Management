const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  email: { type: String, required: true }, // who it's assigned to
  userName: { type: String },
  dueDate: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], required: true },
  progress: { type: Number, default: 0 },
  fileUrl: { type: String },
  imageUrl: { type: String },
});

module.exports = mongoose.model("Task", taskSchema);
