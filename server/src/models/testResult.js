const mongoose = require("mongoose");

const letterStatsSchema = new mongoose.Schema({
  position: Number,
  char: String,
  status: String,
  typingTime: Number,
});

const testResultSchema = new mongoose.Schema({
  testResult: { type: [letterStatsSchema], required: true },
  dateOfCompletion: Date,
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
});

testResultSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("TestResult", testResultSchema);
