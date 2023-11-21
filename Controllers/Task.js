const Task = require("../Models/Task")


function calculateTimeLeft(deadline) {
  const currentDate = new Date();
  const targetDate = new Date(
    deadline.year,
    deadline.month - 1,
    deadline.day,
    ...deadline.time.split(':').map(Number)
  );

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  if (timeDifference < 0) 
    return false
  
  return true
}

const getTasks = async (req, res) => { 
  const Tasks = await Task.find()
  if (!Tasks)
    return res.status(404).json({ err: "Error getting the tasks" })

  const newTasks = Tasks.filter(task => calculateTimeLeft(task.deadLine))

  return res.status(201).json(newTasks )
}

const createTask = async (req, res) => {
  const { className, taskTitle, deadLine,Description } = req.body
  const task = await Task.create({ className, taskTitle, deadLine ,Description})

  if (!task)
    return res.status(402).json({ err: "Error creating a task" })
  
  return res.status(201).json(task)
}
const removeTask = async (req, res) => {
  const taskid = req.params.taskid
  const exist = await Task.deleteOne({ _id: taskid })

  if (!exist)
    return res.status(401).json({ err: "Error removing a task" })
  
  return res.status(201).json({ msg: "Task removed" })
  
}


module.exports = { createTask, removeTask,getTasks }