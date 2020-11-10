const Event = require("../model/Events");
const multer = require("../middlewares/multer");
const isUser = require("../middlewares/isUser")
module.exports = function (app, passport) {
  app.get("/setEvent", isUser,(req, res) => {
    res.render("pages/setEvent");
  });
  app.post("/setEvent", isUser,multer.single("image"), async (req, res) => {
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
  app.get("/getEvents",isUser, async (req, res) => {
    try {
      const events = await Event.find({});
      if (!events) throw Error("event Not found");
      res.status(200).json({ success: true, events });
    } catch (error) {
      res.status(400).json({ success: false, message: error.msg });
    }
  });
  app.get("/event", isUser,async (req, res) => {
    try {
      const events = await Event.find({});
      res.render("pages/events", { events });
    } catch (error) {
      res.render("pages/dashboard", {
        success: false,
        message: "Some error occured",
      });
    }
  });
};
