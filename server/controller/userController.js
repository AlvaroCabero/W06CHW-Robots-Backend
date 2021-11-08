const bcrypt = require("bcrypt");
const User = require("../../database/models/robot");

User.create({
  name: "Luis",
  username: "luis",
  password: bcrypt.hash("luisin1985", 10),
});
