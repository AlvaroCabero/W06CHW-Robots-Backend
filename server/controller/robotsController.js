const debug = require("debug")("robots:controller");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  console.log("getRobots");
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  debug("getRobotById");
  const { id } = req.params;
  try {
    const searchedRobot = await Robot.findById(id);

    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("Robot not found");
      error.code = 404;
      next(error);
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    debug("robot");
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "Please introduce valid data";
    next(error);
  }
};

module.exports = { getRobots, getRobotById, createRobot };
