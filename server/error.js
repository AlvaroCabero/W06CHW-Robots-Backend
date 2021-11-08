const chalk = require("chalk");

const debug = require("debug")("robots:errors");

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({ error: "Endpoint not Found" });
};

const generalErrorHandler = (error, req, res) => {
  debug(chalk.pink("An error occurred: ", error.message));
  const message = error.code ? error.message : "General Error";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  notFoundErrorHandler,
  generalErrorHandler,
};
