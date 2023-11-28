const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const Authrouter = require('./Routers/User')
const Student = require('./Routers/Student')
const Task = require('./Routers/Task')
const File = require('./Routers/File')
const Announcement = require('./Routers/Announcement')
const NewSchedule = require('./Routers/NewSchedule')
const Request = require('./Routers/Request')


require("dotenv").config()

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/user", Authrouter)
app.use("/api/student", Student)
app.use("/api/task", Task)
app.use("/api/file", File)
app.use("/api/announcement", Announcement)
app.use("/api/newSchedule", NewSchedule)
app.use("/api/request", Request)



mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Connected to the database and listening on port ${process.env.PORT}`)
  })
})

