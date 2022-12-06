const testResultRouter = require("express").Router();
const TestResult = require("../models/testResult");
const { isAuth } = require("../middleware/authMiddleware");
const User = require("../models/user");

testResultRouter.post("/", isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const newTestResult = new TestResult({
      testResult: req.body,
      dateOfCompletion: new Date(),
      user: user.id,
    });
    await newTestResult.save();
  } catch (e) {
    console.log(e);
  }
  return res.status(200).end();
});

module.exports = testResultRouter;
