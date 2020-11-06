const Member = require("../model/Member");
const multer = require("../middlewares/multer");
module.exports = function (app) {
  app.get("/setMember", (req, res) => {
    res.render("pages/setMember");
  });
  app.post("/setMember", multer.single("profileImage"), async (req, res) => {
    try {
      const file = req.file;
      const member = new Member();
      member.name = req.body.name;
      member.profileImage = file.path && null;
      member.about = req.body.about && null;
      member.links.twitter = req.body.twitter && null;
      member.links.facebook = req.body.facebook && null;
      member.links.github = req.body.github && null;
      const res = await member.save();
      res.render("pages/setMember", { success: true, message: "Member added" });
    } catch (error) {
      res.render("pages/setMember", {
        success: false,
        message: "Member hasn't been added",
      });
    }
  });

  app.get("/updateMember", (req, res) => {
    res.render("pages/updateMember");
  });
  app.post("/updateMember/:id")
};
