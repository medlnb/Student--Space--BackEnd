const NewSchedule = require("../Models/NewSchedule")

const GetSchedule = async (req, res) => {
  const {Class, Group, Year} = req.body
  const schedule = await NewSchedule.findOne({ Class, Group ,Year})
  
  if (!schedule)
    return res.status(401).json({ message: "Error getting the schedule" })
  
  return res.status(201).json(schedule)
}

const updateSchedule = async (req, res) => {
  const { classgroup } = req.params
  const [Class, Group] = classgroup.split("@")

  await NewSchedule.deleteMany({Class, Group})
  createSchedule(req,res)
}

const createSchedule = async (req, res) => {
  const {Class,Group, modules, Classrooms, types } = req.body
  const newSchedule = await NewSchedule.create({ Class,Group,modules, Classrooms, types })
  
  if (!newSchedule)
    return res.status(400).json({ message: "Error creating newSchedule" })

  return res.status(201).json({message:"newSchedule created"})
}


module.exports = { GetSchedule, createSchedule,updateSchedule }