const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "task-manager-uploads",
      resource_type: "auto", // auto-detect (image, pdf, etc.)
      public_id: `${Date.now()}-${file.originalname}`,
    };
  },
});

module.exports = {
  cloudinary,
  storage,
};
