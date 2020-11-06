var LocalStrategy = require("passport-local").Strategy;

var User = require("../model/User");

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  // LOCAL LOGIN
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        process.nextTick(async function () {
          try {
            const user = await User.findOne({ email });
            if (!user)
              return done(
                null,
                false,
                req.flash("loginMessage", "No user found.")
              );
            if (!user.comparePassword(password)) {
              return done(
                null,
                false,
                req.flash("loginMessage", "Oops! Wrong password.")
              );
            } else return done(null, user);
          } catch (error) {
            done(err);
          }
        });
      }
    )
  );

  // LOCAL SIGNUP

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async function (req, email, password, done) {
        process.nextTick(async function () {
         
          try {
            const user = await User.findOne({ email });

            if (user)
              return done(
                null,
                false,
                req.flash("signupMessage", "That email is already taken.")
              );
            let newUser = new User();
            newUser.name = req.body.name;
            newUser.email = email;
            newUser.password = password;
            await newUser.save();

            return done(null, newUser);
          } catch (error) {
            return done(error);
          }
        });
      }
    )
  );
};
