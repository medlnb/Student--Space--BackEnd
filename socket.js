const { Server } = require('socket.io');
const { createServer } = require('http');
const cors = require('cors');

const httpServer = createServer();
const io = new Server(httpServer);
io.use(cors())
httpServer.listen(3001, () => {
  console.log('listening to 3001');
});

module.exports = io;
