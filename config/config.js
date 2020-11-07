const dotenv = require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const SENDGRID_KEY = process.env.SENDGRID_KEY;
const JWT_KEY = process.env.JWT_KEY;
const URL = process.env.URL;
module.exports = { MONGO_URI, SENDGRID_KEY, JWT_KEY, URL };
