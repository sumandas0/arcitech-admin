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
      member.profileImage = file.path ? file.path : "";
      member.about = req.body.about ? req.body.about : "";
      member.links.twitter = req.body.twitter ? req.body.twitter : "";
      member.links.facebook = req.body.facebook ? req.body.facebook : "";
      member.links.github = req.body.github ? req.body.github : "";
      const res = await member.save();
      res.render("pages/setMember", { success: true, message: "Member added" });
    } catch (error) {
      res.render("pages/setMember", {
        success: false,
        message: "Member hasn't been added",
      });
    }
  });
  app.get("/member", async (req, res) => {
    try {
      const members = await Member.find({});
      res.render("pages/members", { members });
    } catch (error) {
      res.render("pages/dashboard", {
        success: false,
        message: "Some error occured",
      });
    }
  });
  app.get("/updateMember/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const member = await Member.findById(id);
      if (!member) throw Error("Member Not Found");
      res.render("pages/updateMember", { member });
    } catch (error) {
      res.render("pages/dashboard", { success: false, message: error.msg });
    }
    res.render("pages/updateMember");
  });
  app.post("/updateMember/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const res = findByIdAndUpdate(id, req.body);
      res.render("pages/members", { success: true, message: "Member updated" });
    } catch (error) {
      res.render("pages/members", {
        success: false,
        messages: "Error occured",
      });
    }
  });
};
