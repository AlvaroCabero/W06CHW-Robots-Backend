const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  console.log("getRobots");
  const robots = await Robot.find();
  res.json(robots);
};

module.exports = getRobots;
