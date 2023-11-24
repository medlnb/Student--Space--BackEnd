const {createServer} = require("http")

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

server.listen(3001);
module.exports = io;
