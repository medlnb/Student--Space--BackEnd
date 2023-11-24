const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Authrouter = require('./Routers/User')
const Student = require('./Routers/Student')
const Task = require('./Routers/Task')
const Schedule = require('./Routers/Schedule')
const File = require('./Routers/File')
const Announcement = require('./Routers/Announcement')
const { Server } = require('socket.io')
const http = require("http")

require("dotenv").config()

const app = express()



app.use(express.json())
app.use(cors())


app.use("/api/user", Authrouter)
app.use("/api/student", Student)
app.use("/api/task", Task)
app.use("/api/schedule", Schedule)
app.use("/api/file", File)
app.use("/api/announcement", Announcement)



mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Connected to the database and listening on port ${process.env.PORT}`)
  })
})

const server = http.createServer(app);

const sio = require("socket.io")(server, {
    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };
        res.writeHead(200, headers);
        res.end();
    }
});

sio.on("connection", () => {
    console.log("Connected!");
});

server.listen(3000);