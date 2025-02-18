const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

mongoose.connect("mongodb://localhost:27017/tasksDB", { useNewUrlParser: true, useUnifiedTopology: true });

io.on("connection", (socket) => {
  socket.on("updateTask", async (taskId, newStatus) => {
    await Task.findByIdAndUpdate(taskId, { status: newStatus });
    const updatedTasks = await Task.find();
    io.emit("taskUpdated", updatedTasks);
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
