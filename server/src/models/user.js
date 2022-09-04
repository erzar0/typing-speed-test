const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  hash: String,
});

module.exports = mongoose.model("Model", userSchema);
