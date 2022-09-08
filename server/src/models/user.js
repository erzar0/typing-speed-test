const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minlength: 3 },
  hash: { type: String, required: true },
  role: { type: String, default: "visitor", required: true },
});

module.exports = mongoose.model("User", userSchema);
