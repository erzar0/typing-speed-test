const authRouter = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
const passwordUtils = require("../utils/passwordUtils");
const { isAdmin, isAuth } = require("../middleware/authMiddleware");

authRouter.route("/register").post(async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).send("User already exist");
    return;
  }

  const hash = await passwordUtils.generate(password);
  const newUser = new User({ username, hash });
  await newUser.save();

  res.redirect("login");
});

authRouter
  .route("/login")
  .get((req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    }
  })
  .post(passport.authenticate("local", {}), (req, res) => {
    res.send({ loggedIn: true, user: req.session.user });
  });

authRouter.route("/logout").get((req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  res.redirect("/");
});

// authRouter.route("/login-success").get((req, res) => {
//   res.send("Logged successfully").end();
// });

// authRouter.route("/login-failure").get((req, res) => {
//   res.send("Failed to login");
// });

// authRouter.route("/protected-route").get(isAuth, (req, res) => {
//   res.send("You are authenticated");
// });

// authRouter.route("/admin-route").get(isAdmin, (req, res) => {
//   res.send("You are admin");
// });

module.exports = authRouter;
