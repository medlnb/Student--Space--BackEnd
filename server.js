const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Authrouter = require('./Routers/User');
const Student = require('./Routers/Student');
const Task = require('./Routers/Task');
const Schedule = require('./Routers/Schedule');
const File = require('./Routers/File');
const Announcement = require('./Routers/Announcement');
const { createServer } = require('http'); // Import the createServer function from the http module
const { Server } = require('socket.io');

require("dotenv").config()

const app = express()

const server = createServer(app); // Create an HTTP server and pass it the Express app
const io = new Server(server); // Attach Socket.IO to the HTTP server

app.use(express.json());
app.use(cors());

app.use("/api/user", Authrouter);
app.use("/api/student", Student); 
app.use("/api/task", Task);
app.use("/api/schedule", Schedule);
app.use("/api/file", File);
app.use("/api/announcement", Announcement);

io.on('connection', (socket) => {
  console.log('a user connected');
});

mongoose.connect(process.env.MONGO_URI).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Connected to the database and listening on port ${process.env.PORT}`);
  });
});
