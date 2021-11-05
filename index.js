require("dotenv").config();

const connectDB = require("./database/index");

const initializeServer = require("./server/index");

const port = process.env.SERVER_PORT ?? 5000;

// process.env.PORT ??

console.log("PORT", port);

(async () => {
  try {
    await connectDB();
    initializeServer(port);
  } catch (error) {
    process.exit(1);
  }
})();
