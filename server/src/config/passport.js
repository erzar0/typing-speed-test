const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const passwordUtils = require("../utils/passwordUtils");

const validateCallback = async (username, password, done) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return done(null, false);
    }

    let isValid;
    console.log(user);
    try {
      isValid = await passwordUtils.validate(password, user.hash);
    } catch (e) {
      console.log("tu blad");
    }
    console.log("validating:", isValid);
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
    const user = await User.findById(userId);
    done(null, user);
  } catch (e) {
    done(e);
  }
});
