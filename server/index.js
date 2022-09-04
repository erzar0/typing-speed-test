const http = require("http");
const app = require("./src/app");
const mongoose = require("mongoose");
const config = require("./src/config/config");

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
});
