const { Schema, model } = require("mongoose");

nem;
const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  speed: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  img: {
    type: String,
    required: false,
  },
});

const Robot = model("Robot", robotSchema);

module.exports = Robot;
