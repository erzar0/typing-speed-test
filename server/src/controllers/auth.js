const authRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const passwordUtils = require("../utils/passwordUtils");

const isAuth = require("../middleware/authMiddleware");

authRouter.route("/register").post(async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: "User already exist" });
    return;
  }
  const hash = await passwordUtils.generate(password);
  const newUser = new User({ username, hash, email });
  try {
    await newUser.save();
  } catch (e) {
    console.log("Error occured while saving new user to db", e);
    res
      .status(500)
      .json({ message: "Error occured while saving new user to db" });
  }

  res.status(200).end();
});

authRouter.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "login-success",
    failureRedirect: "login-failure",
  })
);

authRouter.route("/logout").get((req, res, next) => {
  req.logout((err) => {
    console.log(err);
  });
  res.json({ success: true, message: "logged out successfully" });
});

authRouter.route("/login-success").get(async (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "authentication succeeded",
      user: await User.findById(req.user._id),
    });
    return;
  }
  res.json({ success: false, message: "you are not authenticated" });
});
authRouter.route("/login-failure").get((req, res) => {
  res.status(401).json({ success: false, message: "authentication failed" });
});

module.exports = authRouter;
