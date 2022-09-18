module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You muse be logged in to view this resource" });
  }
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === "admin") {
    next();
  } else {
    res
      .status(401)
      .json({ message: "You must be an admin to view this resource" });
  }
};
