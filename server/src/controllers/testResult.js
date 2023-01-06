const testResultRouter = require("express").Router();
const TestResult = require("../models/testResult");
const { isAuth } = require("../middleware/authMiddleware");
const User = require("../models/user");

testResultRouter.post("/", isAuth, async (req, res) => {
  if (!req.user) {
    res.status(401);
  }
  try {
    const user = await User.findOne({ username: req.user.username });
    const newTestResult = new TestResult({
      testResult: req.body,
      dateOfCompletion: Date.now(),
      user: user.id,
    });
    console.log(newTestResult);
    await newTestResult.save();
    return res.status(200).json(newTestResult.testResult).end();
  } catch (e) {
    console.log(e);
  }
  return res.status(400);
});

module.exports = testResultRouter;
