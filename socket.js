const { Server } = require('socket.io');
const { createServer } = require('http');


const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
httpServer.listen(3001, () => {
  console.log('listening to 3001');
});

module.exports = io;
