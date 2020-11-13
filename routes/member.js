const Member = require("../model/Member");
const multer = require("../middlewares/multer");
const isUser = require("../middlewares/isUser");
const cloudinary = require("cloudinary").v2;
module.exports = function (app) {
  app.get("/setMember", isUser, (req, res) => {
    res.render("pages/setMember");
  });
  app.post(
    "/setMember",
    isUser,
    multer.single("profileImage"),
    async (req, res) => {
      try {
        const file = req.file;
        const member = new Member();
        member.name = req.body.name;
        member.about = req.body.about || "";
        member.links.twitter = req.body.twitter || "";
        member.links.linkedin = req.body.linkedin || "";
        member.links.github = req.body.github || "";
     
        const resp = await cloudinary.uploader.upload(file.path);
        member.profileImage = resp.secure_url || "";
        await member.save();
        res.render("pages/setMember", {
          success: true,
          message: "Member added",
        });
      } catch (error) {
        res.render("pages/setMember", {
          success: false,
          message: "Member hasn't been added",
        });
      }
    }
  );
  app.get("/member", isUser, async (req, res) => {
    try {
      const members = await Member.find({});
      res.render("pages/members", { members });
    } catch (error) {
      res.render("pages/index", {
        success: false,
        message: "Some error occured",
      });
    }
  });
  app.get("/getMembers", async (req, res) => {
    try {
      const members = await Member.find({});
      if (!members) throw Error("Member Not found");
      res.status(200).json({ success: true, members });
    } catch (error) {
      res.status(400).json({ success: false, message: error.msg });
    }
  });
  app.get("/updateMember/:id", isUser, async (req, res) => {
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
  app.post("/updateMember/:id", isUser, async (req, res) => {
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
