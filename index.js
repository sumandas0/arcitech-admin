const express = require("express");
const passport =require("passport")
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.get("/", function (req, res) {
  res.render("pages/index");
});
require("./routes/index")(app, passport);
require("./config/passport")(passport);
app.listen(3000, () => console.log("Server is up at port 3000"));
