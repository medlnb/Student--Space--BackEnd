const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Authrouter = require("./Routers/User");
const Task = require("./Routers/Task");
const File = require("./Routers/File");
const Announcement = require("./Routers/Announcement");
const Schedule = require("./Routers/Schedule");
const Request = require("./Routers/Request");
const RequireAuth = require("./Middleware/RequireAuth");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", Authrouter);
app.use("/api/request", Request);

app.use(RequireAuth);

app.use("/api/task", Task);
app.use("/api/file", File);
app.use("/api/announcement", Announcement);
app.use("/api/Schedule", Schedule);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to the database and listening on port ${process.env.PORT}`
    );
  });
});
