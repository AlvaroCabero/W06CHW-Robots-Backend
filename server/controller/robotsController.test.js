const Robot = require("../../database/models/robot");
const { getRobots, getRobotById, createRobot } = require("./robotsController");

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
            id: 33,
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

    describe("And Robot.findById resolves to Id Not Found", () => {
      test("Then it should call the next function with the 404 error", async () => {
        const id = "";
        const error = new Error("Robot not found");
        error.code = 404;

        const req = {
          params: {
            id,
          },
        };
        const res = {
          json: jest.fn(),
        };

        Robot.findById = jest.fn().mockResolvedValue(null);
        const next = jest.fn();

        await getRobotById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        // expect(error).toHaveProperty("code");
        expect(next.mock.calls[0][0].code).toBe(error.code);
      });
    });
  });
});

describe("Given a createRobot function", () => {
  describe("When it receives a request with a robot object, with no id, an object res, and a function next", () => {
    test("Then it should invoke the method json of res with the same robot object", async () => {
      const robot = {
        name: "Robin",
        img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2012/10/4559-6-mejores-robots.jpg?itok=ZoIBaSaR",
        Stats: {
          speed: 5,
          resistance: 4,
          creation: "1977-01-01T23:00:00.000+00:00",
        },
      };
      const robot2 = {
        name: "Robina",
        img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2012/10/4559-6-mejores-robots.jpg?itok=ZoIBaSaR",
        Stats: {
          speed: 8,
          resistance: 5,
          creation: "1977-01-01T23:00:00.000+00:00",
        },
      };
      Robot.create = jest.fn().mockResolvedValue(robot2);
      const req = {
        body: robot,
      };
      const res = {
        json: jest.fn().mockResolvedValue(robot),
      };

      await createRobot(req, res);

      expect(Robot.create).toHaveBeenCalledWith(robot);
      expect(res.json).toHaveBeenCalledWith(robot2);
    });
  });
  describe("And Robot.create rejects", () => {
    test("then it should invoke next function with error rejected", async () => {
      const error = {};
      const robot = {
        name: "Robin",
        img: "https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/styles/480/public/media/image/2012/10/4559-6-mejores-robots.jpg?itok=ZoIBaSaR",
        Stats: {
          speed: 5,
          resistance: 4,
          creation: "1977-01-01T23:00:00.000+00:00",
        },
      };
      Robot.create = jest.fn().mockRejectedValue(error);
      const req = {
        body: robot,
      };
      const res = {
        json: jest.fn(),
      };

      const next = jest.fn();

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
      expect(error.message).toBe("Please introduce valid data");
    });
  });
});
