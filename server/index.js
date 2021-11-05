const chalk = require("chalk");
const debug = require("debug")("robots:server");
const express = require("express");
const morgan = require("morgan");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.cyan(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("Initialization Error"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port ${port}`));
    }
  });
};

app.use(morgan("dev"));

module.exports = initializeServer;
