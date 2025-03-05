const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const mongo_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    // No options are needed for Mongoose v6+ 
    await mongoose.connect(mongo_url);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Stop the process if the connection fails
  }
};

module.exports = connectDB;
