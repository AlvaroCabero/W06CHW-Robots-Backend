const bcrypt = require("bcrypt");
const User = require("../../database/models/robot");

User.create({
  name: "Luis",
  username: "luis",
  password: bcrypt.hash("luisin1985", 10),
});

// require("dotenv").config();
// const User = require("../../database/models/user");
// const loginUser = require("./userController");
// const jwt = require("jsonwebtoken");

// jest.mock("../../database/models/user");
// jest.mock("bcrypt");
// jest.mock("jsonwebtoken");

// describe("Given a loginUser function", () => {
//   describe("When it receives a req with a wrong username in its body", () => {
//     test("Then it should invoke the function next with an error", async () => {
//       const req = {
//         body: {
//           username: "patatita",
//           password: "patatita",
//         },
//       };
//       User.findOne = jest.fn().mockResolvedValue(null);
//       const error = new Error("Wrong credentials");
//       error.code = 401;
//       const next = jest.fn();

//       await loginUser(req, null, next);

//       expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
//       expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
//     });
//   });

//   describe("When it receives a req with a valid username wrong password in its body", () => {
//     test("Then it should invoke the function next with an error", async () => {
//       const req = {
//         body: {
//           username: "loling",
//           password: "patatita",
//         },
//       };
//       const user = {
//         username: "loling",
//         password: "patatita",
//       };

//       bcrypt.compare = jest.fn().mockResolvedValue(false);
//       User.findOne = jest.fn().mockResolvedValue(user);
//       const error = new Error("Wrong password");
//       error.code = 401;
//       const next = jest.fn();

//       await loginUser(req, null, next);

//       expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
//       expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
//     });
//   });

//   describe("When it receives a req with a right password and username", () => {
//     test("Then it should invoke res.json with an object with a brand new token inside", async () => {
//       const user = {
//         username: "loling",
//         password: "loling",
//       };
//       const req = {
//         body: user,
//       };

//       const res = {
//         json: jest.fn(),
//       };
//       const expectedToken = "loquesea";
//       jwt.sign = jest.fn().mockResolvedValue(expectedToken);
//       User.findOne = jest.fn().mockResolvedValue(user);
//       bcrypt.compare = jest.fn().mockResolvedValue(true);
//       const expectedResponse = {
//         token: expectedToken,
//       };

//       await loginUser(req, null);

//       expect(res.json).toHaveBeenCalledWith(expectedResponse);
//     });
//   });
// });
