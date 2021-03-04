const mongoose = require("mongoose");
const MemberSchema = mongoose.Schema({
  name: { type: String, required: true },
  role:{type:String},
  profileImage: String,
  links: { _id: false, email: String, linkedin: String, github: String },
});
const model = mongoose.model("Member", MemberSchema);
module.exports = model;
