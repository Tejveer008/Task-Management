const express = require("express");
const router = express.Router();
const Project = require("../Models/Project");

const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

// 🟢 Create a new project
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
      statusColor: "blue", // Optional static field
    });

    await newProject.save();
    const projects = await Project.find();
    res.status(201).json({ project: newProject, projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// 🔁 Update an existing project
router.put("/:id", upload.fields([{ name: "file" }, { name: "image" }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { task, userName, dueDate, progress, priority } = req.body;

    const updatedData = {
      task,
      userName,
      dueDate,
      progress,
      priority,
    };

    if (req.files?.file) updatedData.fileUrl = req.files.file[0].path;
    if (req.files?.image) updatedData.imageUrl = req.files.image[0].path;

    const updatedProject = await Project.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json({ project: updatedProject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

// ❌ Delete a project
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Project.findByIdAndDelete(id);
    const projects = await Project.find();
    res.status(200).json({ message: "Project deleted", projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// 📦 Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

module.exports = router;
