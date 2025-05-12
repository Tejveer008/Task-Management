// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const { getAllUsers, assignTask, deleteUser } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // ⬅️ Multer setup


router.get("/users", protect, isAdmin, getAllUsers);
// ⬇️ Handle image + file uploads
router.post(
  "/assign-task",
  protect,
  isAdmin,
  upload.fields([
    { name: "file", maxCount: 5 },
    { name: "image", maxCount: 5 },
  ]),
  assignTask
);

router.delete("/user/:id", protect, isAdmin, deleteUser);

module.exports = router;
