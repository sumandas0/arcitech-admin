const keys = require("./keys");
const MONGO_URI = process.env.MONGO_URI || keys.mongo_uri;
const SENDGRID_KEY = process.env.SENDGRID_KEY || keys.sendgrid_key;
const JWT_KEY = process.env.JWT_KEY || keys.jwt_key;
const URL = process.env.URL || "localhost:3000";
module.exports = { MONGO_URI, SENDGRID_KEY, JWT_KEY, URL };
