const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const isUser = require("../middlewares/isUser");
const isAdmin = require("../middlewares/isAdmin");
const JWT_TOKEN = require("../config/config").JWT_KEY;
const url = require("../config/config").URL;
const os = require('os')

module.exports = function (app, passport) {
  app.get("/user/invite", isAdmin, (req, res) => {
    res.render("pages/invite");
  });
  app.post(
    "/user/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/",
      failureRedirect: "/user/signup", // redirect back to the signup page if there is an error
      failureFlash: true,
    })
  );

  app.post(
    "/user/login",
    passport.authenticate("local-login", {
      successRedirect: "/",
      failureRedirect: "/user/login", // redirect back to the signup page if there is an error
      failureFlash: true,
    })
  );
  app.get("/user/login", (req, res) => {
    console.log(req.headers.host);
    res.render("pages/login");
  });
  app.post("/user/invite", isAdmin, (req, res) => {
    const email = req.body.email;
    const token = jwt.sign({ email }, JWT_TOKEN);
    const msg = {
      to: String(email), // Change to your recipient
      from: "sumandas.workplace@gmail.com", // Change to your verified sender
      subject: "Arcitech Admin SignUp",
      text:
        "Please open the given link to open account in arcitech admin panel",
      html:
        '<p>Click <a href="http://arcitech.herokuapp.com/user/invite/' +
        token +
        '">here</a> to set your password</p>',
    };
    sgMail
      .send(msg)
      .then(() => {
        res.redirect("/user/invite");
      })
      .catch((error) => {
        res.redirect("/pages/invite");
      });
  });
  app.get("/user/invite/:token", (req, res) => {
    const token = req.params.token;
    const decoded = jwt.verify(token, JWT_TOKEN);
    if (!decoded.email) {
      res.render("pages/login", { message: "Email not sent to you dear.." });
    }
    res.render("pages/setPassword", { email: decoded.email });
  });
  app.get("/user/dashboard", isUser, (req, res) => {
    res.render("pages/dashboard");
  });
};
