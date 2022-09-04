const express = require("express");
const passport = require("passport");
const database = require("./config/database");
const config = require("./config/config");
const { createClient } = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const textRouter = require("./controllers/text");
const authRouter = require("./controllers/auth");

const app = express();

database.connect();
let redisClient = createClient({
  host: "localhost",
  port: 6379,
  legacyMode: true,
});
redisClient.connect().catch(console.error);

require("./config/passport");

app.disable("x-powered-by");
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    secret: config.SECRET,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(cors());
app.use(express.json());
// app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use("/api/text", textRouter);
app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  console.log(req.session);
  res.json({ elo: "world" });
});

module.exports = app;
