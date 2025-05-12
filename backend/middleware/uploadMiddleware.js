const multer = require("multer");

// Configure multer to store files in memory (for Cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = [
      "application/pdf",
      "application/msword",
      "image/jpeg",
      "image/png",
      "image/webp",
    ];
    if (allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOCX, JPEG, PNG allowed."));
    }
  },
});

module.exports = upload;