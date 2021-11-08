const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { notFoundErrorHandler, generalErrorHandler } = require("./error");
const robotsRoutes = require("./routes/robotsRoutes");

const app = express();

app.use(cors());

app.use(express.json());

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.cyan(`Listening to port ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Initialization Error"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port ${port} in use`));
    }
  });
};

app.use(morgan("dev"));

app.use("/robots", robotsRoutes);
app.use("/login", robotsRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = initializeServer;
