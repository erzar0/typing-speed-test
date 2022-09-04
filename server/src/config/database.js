const mongoose = require("mongoose");
const config = require("./config");

const connect = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (e) {
    console.error("error connecting to MongoDB:", e.message);
  }
  console.log("Connected to mongodb");
};

module.exports = { connect };
