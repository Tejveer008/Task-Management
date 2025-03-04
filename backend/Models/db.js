const mongoose = require('mongoose');
require('dotenv').config(); // Make sure to load environment variables

const mongo_url = process.env.MONGO_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongo_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Stop the process if the connection fails
  }
};

module.exports = connectDB;
