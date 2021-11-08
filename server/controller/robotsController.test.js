const Robot = require("../../database/models/robot");
const { getRobots, getRobotById } = require("./robotsController");

describe("Given a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should call the method json of the res object", async () => {
      const robots = [
        {
          id: 1,
          name: "Roboz",
          img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2012/10/4559-6-mejores-robots.jpg?itok=ZoIBaSaR",
          Stats: {
            speed: 4,
            resistance: 2,
            creation: "1977-01-01T23:00:00.000+00:00",
          },
        },
        {
          id: 1,
          name: "Roboz2",
          img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2012/10/4559-6-mejores-robots.jpg?itok=ZoIBaSaR",
          Stats: {
            speed: 5,
            resistance: 6,
            creation: "2008-06-07T22:00:00.000+00:00",
          },
        },
      ];

      Robot.find = jest.fn().mockResolvedValue(robots);

      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given a getRobotById function,", () => {
  describe("When it receives a req object with id 33, a res object, and a next function", () => {
    test("Then it should call Robot.findById method with a 33", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});

      const id = 33;
      const req = {
        params: {
          id,
        },
      };
      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(id);
    });

    describe("And Robot.findById rejects", () => {
      test("Then it should invoke the next function with the error rejected", async () => {
        const error = {};
        Robot.findById = jest.fn().mockRejectedValue(error);
        const req = {
          params: {
            id: 0,
          },
        };
        const res = {};
        const next = jest.fn();

        await getRobotById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(error).toHaveProperty("code");
        expect(error.code).toBe(400);
      });
    });

    describe("And Robot.findById resolves to Roboz", () => {
      test("Then it should call res.json method with Roboz Data", async () => {
        const id = 33;
        const roboz = {
          id,
          name: "Roboz",
          img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2012/10/4559-6-mejores-robots.jpg?itok=ZoIBaSaR",
          Stats: {
            speed: 4,
            resistance: 2,
            creation: "1977-01-01T23:00:00.000+00:00",
          },
        };
        Robot.findById = jest.fn().mockResolvedValue(roboz);
        const req = {
          params: {
            id,
          },
        };
        const res = {
          json: jest.fn(),
        };

        await getRobotById(req, res);

        expect(res.json).toHaveBeenCalledWith(roboz);
      });
    });
  });
});
