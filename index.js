const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const MONGO_URI = require("./config/config").MONGO_URI;
const SENDGRID_KEY = require("./config/config").SENDGRID_KEY;
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(flash());
app.use(
  session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.session());
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => console.log("Connected to mongo"))
  .catch((e) => console.log("Mongoose error occured"));
app.get("/", function (req, res) {
  res.render("pages/index");
});
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_KEY);

require("./routes/index")(app, passport);
require("./config/passport")(passport);
app.listen(process.env.PORT || 3000, () => console.log("Server is up at port 3000"));
