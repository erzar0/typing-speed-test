const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
  username: String,
  hash: String,
});

module.exports = mongoose.model("Model", userSchema);
=======
  username: { type: String, required: true, minlength: 3, unique: true },
  hash: { type: String, required: true, select: false },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: "visitor", required: true },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("User", userSchema);
>>>>>>> dev
