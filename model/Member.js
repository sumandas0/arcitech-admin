const mongoose = require("mongoose");
const MemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  profileImage: String,
  links: { _id: false, twitter: String, linkedin: String, github: String },
  about: String,
});
const model = mongoose.model("Member", MemberSchema);
module.exports = model;
