const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require('./routes/userRoutes');
const path = require('path');

dotenv.config();

const app = express(); // ✅ Moved this up!

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

// Serve frontend (React build)
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
