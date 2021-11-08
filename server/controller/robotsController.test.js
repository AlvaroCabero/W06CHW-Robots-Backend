const Robot = require("../../database/models/robot");
const { getRobots } = require("./robotsController");

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
