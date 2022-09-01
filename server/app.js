const express = require("express");
const app = express();

const cors = require("cors");
const morgan = require("morgan");

const textRouter = require("./controllers/text");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/text", textRouter);

app.get("/", (req, res) => {
  res.json({ hello: "world" }).end();
});

module.exports = app;
