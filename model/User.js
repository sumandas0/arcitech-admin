const mongoose = require("mongoose");
const argon2 = require("argon2");
const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  superAdmin: { type: Boolean, default: false },
});
userSchema.pre("save", async function (next) {
  let user = this;
  if (!user.isModified("password")) return next();
  try {
    const hash = await argon2.hash(user.password);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    if (await argon2.verify(this.password, candidatePassword)) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
module.exports = mongoose.model("User", userSchema);
