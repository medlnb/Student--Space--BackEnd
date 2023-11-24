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
const {createServer} = require("http")

require("dotenv").config()

const app = express()

const httpServer = createServer()
httpServer.use(cors())
const io = new Server(httpServer)

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

httpServer.listen(3001, () => {
  console.log("listening to 3001")
})

