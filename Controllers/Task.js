const Task = require("../Models/Task")

async function sendTelegramMessage(token, channel, message) {
    try {
        // Construct the Telegram API endpoint for sending a message
        const request = await fetch(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${channel}&text=${message}`, {
            method: 'GET',
            redirect: 'follow'
        });

        // Parse the JSON response from the Telegram API
        const response = await request.json();

        // Return the response object
        return response;
    } catch (error) {
        // Handle errors by logging them to the console
        console.error('Error:', error);
    }
}

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
  const Tasks = await Task.find({speciality:"MASTER@1@Artificial Intelligence & Data Science"})
  if (!Tasks)
    return res.status(404).json({ err: "Error getting the tasks" })

  const newTasks = Tasks.filter(task => calculateTimeLeft(task.deadLine))

  return res.status(201).json(newTasks)
}

const createTask = async (req, res) => {
  const { className, taskTitle, deadLine,Description,Link,speciality } = req.body
  const task = await Task.create({ className, taskTitle, deadLine ,Description,Link,speciality})

  if (!task)
    return res.status(402).json({ err: "Error creating a task" })
  
  await sendTelegramMessage(process.env.TOKEN,
    process.env.CHANNEL,
    `New task from ${className}:
    \n${taskTitle}`);
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