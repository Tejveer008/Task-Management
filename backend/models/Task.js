// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: { type: String, required: true },
  email: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  userName: { type: String, required: true },
  progress: { type: Number, default: 0 },
  imageUrl: { type: String },
  fileUrl: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true }, // Ensure this field exists
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);