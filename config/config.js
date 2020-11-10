require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;
const CLOUDINARY_CONFIG = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};
const JWT_KEY = process.env.JWT_KEY;
const URL = process.env.URL;
module.exports = {
  MONGO_URI,
  SENDGRID_KEY,
  JWT_KEY,
  URL,
  CLOUDINARY_URL,
  CLOUDINARY_CONFIG,
};
