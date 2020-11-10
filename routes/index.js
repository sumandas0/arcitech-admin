const isUser = require("../middlewares/isUser");

module.exports = function (app, passport) {
  app.get("/",isUser, function (req, res) {
    //console.log(req.session)
    res.render("pages/index");
  });
  require("./user")(app, passport);
  require("./event")(app, passport);
  require("./member")(app);
  require("./message")(app);
};
