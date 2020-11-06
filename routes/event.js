const Event = require("../model/Events");
const multer = require("../middlewares/multer");
module.exports = function (app, passport) {
  app.get("/setEvent", (req, res) => {
    res.render("pages/setEvent");
  });
  app.post("/setEvent", multer.single("image"), async (req, res) => {
    try {
      const file = req.file;
      const event = new Event();
      event.topic = req.body.topic;
      event.image = file.path;
      event.details = req.body.details;
      event.eventLink = req.body.eventLink;
      const res = await event.save();
      res.render("pages/setEvent", { success: true, message: "Event added" });
    } catch (error) {
      res.render("pages/setEvent", {
        success: false,
        message: "Event hasn't been added",
      });
    }
  });
};
