const debug = require("debug")("robots:database");
const chalk = require("chalk");

const mongoose = require("mongoose");

const connectDB = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.ANDROIDDB_STRING, (error) => {
      if (error) {
        debug(chalk.red("Error starting DataBase"));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Connected to AndroidDataBase"));
      resolve();
    });
  });

module.exports = connectDB;
