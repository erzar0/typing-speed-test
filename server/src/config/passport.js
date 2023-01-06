const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const passwordUtils = require("../utils/passwordUtils");

const validateCallback = async (username, password, done) => {
  console.log(password, username);
  try {
    const user = await User.findOne({ username }).select("+hash");
    if (!user) {
      return done(null, false);
    }

    const isValid = await passwordUtils.validate(password, user.hash);
    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (e) {
    done(e);
  }
};
const strategy = new LocalStrategy(validateCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findById(userId).select("+hash");
    done(null, user);
  } catch (e) {
    done(e);
  }
});
