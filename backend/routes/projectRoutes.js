const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");

const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// Create task with file/image upload
router.post("/", upload.fields([{ name: "file" }, { name: "image" }]), async (req, res) => {
  try {
    const { task, userName, dueDate, progress, priority } = req.body;

    const fileUrl = req.files?.file ? req.files.file[0].path : "";
    const imageUrl = req.files?.image ? req.files.image[0].path : "";

    const newProject = new Project({
      task,
      userName,
      dueDate,
      progress,
      priority,
      fileUrl,
      imageUrl,
      statusColor: "blue",
    });

    await newProject.save();
    const projects = await Project.find();
    res.status(201).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
