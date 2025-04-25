const express = require("express");
const router = express.Router();

const Project = require("../Models/Project");

const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

/**
 * POST: Create a new task
 * Required fields: task, userName (admin), assignedTo (user), dueDate, progress, priority
 */
router.post("/", upload.fields([{ name: "file" }, { name: "image" }]), async (req, res) => {
  try {
    const { task, userName, assignedTo, dueDate, progress, priority } = req.body;

    const fileUrl = req.files?.file ? req.files.file[0].path : "";
    const imageUrl = req.files?.image ? req.files.image[0].path : "";

    const newProject = new Project({
      task,
      userName,        // Admin name
      assignedTo,      // Assigned user (email or ID)
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
    console.error("Error creating project:", err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

/**
 * PUT: Update a task by ID
 */
router.put("/:id", upload.fields([{ name: "file" }, { name: "image" }]), async (req, res) => {
  try {
    const { id } = req.params;
    const { task, userName, assignedTo, dueDate, progress, priority } = req.body;

    const fileUrl = req.files?.file ? req.files.file[0].path : undefined;
    const imageUrl = req.files?.image ? req.files.image[0].path : undefined;

    const updatedData = {
      task,
      userName,
      assignedTo,
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
    console.error("Error updating project:", err);
    res.status(500).json({ error: "Failed to update project" });
  }
});

/**
 * GET: Fetch all projects
 */
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

/**
 * DELETE: Delete a task by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Project.findByIdAndDelete(id);
    const projects = await Project.find(); // return updated list
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

module.exports = router;