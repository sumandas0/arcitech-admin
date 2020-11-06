const User = require("../model/User");
module.exports = async (req, res, next) => {
  if (!req.session.passport.user) {
    throw Error("User not authenticated");
  }
  const userId = req.session.passport.user;
  try {
    const user = await User.findById(userId);
    if (!user) throw Error("User Not authenticated");
    if (!user.superAdmin) throw "User Not authenticated";
    req.user = user;
    next();
  } catch (error) {
    res.render("pages/login", {
      message: "Authentication error",
    });
  }
};
