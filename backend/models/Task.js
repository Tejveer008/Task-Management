// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  email: { type: String, required: true },
  dueDate: { type: String, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  userName: { type: String },
  progress: { type: Number, default: 0 },
  fileUrl: { type: String },
  imageUrl: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
