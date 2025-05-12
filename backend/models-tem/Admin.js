const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  permissions: {
    type: [String], // e.g., ['manageTasks', 'manageUsers']
  },
});

module.exports = mongoose.model('Admin', adminSchema);
