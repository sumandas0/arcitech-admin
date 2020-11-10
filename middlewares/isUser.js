const User = require("../model/User");
module.exports = async (req, res, next) => {
  try {
    if (req.session.passport === undefined) {
      throw Error("User not authenticated");
    }
    const userId = req.session.passport.user;
    const user = await User.findById(userId);
    if (!user) throw Error("User Not authenticated");
    req.user = user;
    next();
  } catch (error) {
    res.render("pages/login", {
      success: false,
      message: "User not found or Password misMatch",
    });
  }
};
