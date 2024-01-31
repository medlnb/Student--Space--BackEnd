const Task = require("../Models/Task");

async function sendTelegramMessage(token, channel, message) {
  const request = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${message}`,
    {
      method: "GET",
      redirect: "follow",
    }
  );
  const response = await request.json();
  return response;
}

function calculateTimeLeft(deadline) {
  const currentDate = new Date();
  const targetDate = new Date(
    deadline.year,
    deadline.month - 1,
    deadline.day,
    ...deadline.time.split(":").map(Number)
  );

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference < 0) return false;

  return true;
}

const getTasks = async (req, res) => {
  const authorization = req.user;
  const { specIndex } = req.params;
  const speciality = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;

  const Tasks = await Task.find({ speciality, Year });
  if (!Tasks) return res.status(404).json({ err: "Error getting the tasks" });

  const newTasks = Tasks.filter((task) => calculateTimeLeft(task.deadLine));

  return res.status(201).json(newTasks);
};

const createTask = async (req, res) => {
  const { taskTitle, deadLine, Description, Link, Channel } = req.body;
  const authorization = req.user;
  const className = authorization.username;

  const { specIndex } = req.params;
  const speciality = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;
  const task = await Task.create({
    className,
    taskTitle,
    deadLine,
    Description,
    Link,
    speciality,
    Year,
  });

  if (!task) return res.status(402).json({ err: "Error creating a task" });

  await sendTelegramMessage(
    process.env.TOKEN,
    Channel,
    `New task from ${className}:
    \n${taskTitle}`
  );
  return res.status(201).json(task);
};
const removeTask = async (req, res) => {
  const taskid = req.params.taskid;
  const exist = await Task.deleteOne({ _id: taskid });

  if (!exist) return res.status(401).json({ err: "Error removing a task" });

  return res.status(201).json({ msg: "Task removed" });
};

module.exports = { createTask, removeTask, getTasks };
