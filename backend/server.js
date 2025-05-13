// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path'); // Add path module
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Enable CORS
app.use(cors({ origin: ['http://localhost:5173', 'https://task-management-4gvv.onrender.com'],credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Support FormData for file uploads
app.use(cookieParser());

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT,'0.0.0.0', () => console.log('Server running on port http://localhost:8080'));
  })
  .catch((err) => console.log(err));