const Message = require("../model/Message");
const Messaage = require("../model/Message");
const isUser = require("../middlewares/isUser");
module.exports = (app) => {
  app.post("/message", async (req, res) => {
    try {
      const message = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
      };
      const msg = new Messaage(message);
      await msg.save();
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(400);
    }
  });
  app.get("/message", isUser, async (req, res) => {
    try {
      const messages = (await Messaage.find({})) || {
        name: "",
        email: "",
        message: "",
        id: "",
      };

      res.render("pages/messages", { messages });
    } catch (error) {
      res.render("pages/messages", {
        success: false,
        message: "Some error occured",
      });
    }
  });
  app.get("/message/delete/:id",isUser, async (req, res) => {
    try {
      const id = req.params.id;
      await Message.findByIdAndRemove(id);
      const messages = await Messaage.find({});
      res.render("pages/messages", { messages });
    } catch (error) {
      res.render("pages/messages", {
        success: false,
        message: "Some error occured",
      });
    }
  });
  app.get("/message/view/:id",isUser, async (req, res) => {
    try {
      const id = req.params.id;
      const message = await Message.findOneAndUpdate(
        { _id: id },
        { $set: { read: true } }
      );
      res.render("pages/viewMessage", { message });
    } catch (error) {
      res.render("pages/viewMessage", {
        success: false,
        message: "Some error occured",
      });
    }
  });
};
