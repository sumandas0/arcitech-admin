const userRoutes = require("./user");
module.exports = function (app, passport) {
  require("./user")(app, passport);
  require("./event")(app, passport);
  require("./member")(app);
};
