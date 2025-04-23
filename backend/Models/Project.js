const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  task: { type: String, required: true },
  userName: { type: String, required: true },
  dueDate: { type: String, required: true },
  progress: { type: Number, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  fileUrl: { type: String },
  imageUrl: { type: String },
  statusColor: { type: String, default: 'blue' },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
