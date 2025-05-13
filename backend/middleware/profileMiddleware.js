// profileMiddleware.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

exports.profile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"));
  },
});

exports.validateProfileUpdate = (req, res, next) => {
  // Check if req.user is defined (set by protect middleware)
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, user not found" });
  }

  const { adminName, username, email } = req.body;

  // Ensure at least one field is being updated (excluding profilePhoto)
  if (!adminName && !username && !email && !req.file) {
    return res.status(400).json({ message: "No updates provided" });
  }

  // For users, email updates are not allowed
  if (req.user.role === "user" && email) {
    return res.status(403).json({ message: "Users cannot update email" });
  }

  next();
};