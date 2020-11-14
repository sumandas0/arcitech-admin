const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const MONGO_URI = require("./config/config").MONGO_URI;
const SENDGRID_KEY = require("./config/config").SENDGRID_KEY;
const CLOUDINARY_CONFIG = require("./config/config").CLOUDINARY_CONFIG;
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(flash());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
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
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((res) => console.log("Connected to mongo"))
  .catch((e) => console.log("Mongoose error occured"));
cloudinary.config(CLOUDINARY_CONFIG);

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_KEY);

require("./routes/index")(app, passport);
require("./config/passport")(passport);

app.listen(process.env.PORT || 4000, () =>
  console.log("Server is up at port 3000")
);
