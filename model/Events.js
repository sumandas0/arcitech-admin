const mongoose = require("mongoose");
const EventSchema = mongoose.Schema({
  topic: { type: String, required: true },
  image: { type: String },
  details: { type: String, required: true },
  eventLink: { type: String },
  featured: Boolean,
});
const model = mongoose.model("Event", EventSchema);
module.exports = model;
