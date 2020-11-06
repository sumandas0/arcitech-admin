const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
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
    cookie:{
      maxAge: 60000 * 60
    }
  })
);
app.use(passport.session());
mongoose
  .connect(
    "mongodb+srv://sumand:yOwqLiseHDbOmjHy@cluster0.wdba9.mongodb.net/arc?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((res) => console.log("Connected to mongo"))
  .catch((e) => console.log("Mongoose error occured"));
app.get("/", function (req, res) {
  res.render("pages/index");
});
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

require("./routes/index")(app, passport);
require("./config/passport")(passport);
app.listen(3000, () => console.log("Server is up at port 3000"));
