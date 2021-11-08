const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  Stats: {
    speed: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    resistance: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    creation: {
      type: Date,
      required: true,
    },
  },
});

const Robot = model("Robot", robotSchema, "robots");

module.exports = Robot;
