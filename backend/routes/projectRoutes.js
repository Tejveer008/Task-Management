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

// Update a project by ID
router.put("/:id", upload.fields([{ name: "file" }, { name: "image" }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { task, userName, dueDate, progress, priority } = req.body;

    const fileUrl = req.files?.file ? req.files.file[0].path : undefined;
    const imageUrl = req.files?.image ? req.files.image[0].path : undefined;

    const updatedData = {
      task,
      userName,
      dueDate,
      progress,
      priority,
    };

    if (fileUrl) updatedData.fileUrl = fileUrl;
    if (imageUrl) updatedData.imageUrl = imageUrl;

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

// Delete a project by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});


module.exports = router;
