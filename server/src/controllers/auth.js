const authRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const passwordUtils = require("../utils/passwordUtils");

authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  res.send("login route");
});

authRouter.post("/register", async (req, res) => {
  const body = req.body;

  const hash = passwordUtils.generate(body.password);
  const newUser = new User({
    username: body.username,
    hash,
  });
  const u = await newUser.save();
  console.log(u);

  res.redirect("/login");
});

module.exports = authRouter;
