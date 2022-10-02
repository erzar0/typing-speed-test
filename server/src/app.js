const express = require("express");
require("express-async-errors");
const passport = require("passport");
const database = require("./config/database");
const config = require("./config/config");
const { createClient } = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const hpp = require("hpp");
const csurf = require("csurf");
const rateLimit = require("express-rate-limit");
const textRouter = require("./controllers/text");
const authRouter = require("./controllers/auth");
const { errorHandler } = require("./middleware/errorHandler");

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
// app.use(helmet());
// app.use(hpp())
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

// const apiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// app.use("/api/", apiLimiter);
// app.use(csurf({ cookie: true }));

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan("dev"));
app.use("/api/text", textRouter);
app.use("/api/auth", authRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ elo: "world" });
});

module.exports = app;
