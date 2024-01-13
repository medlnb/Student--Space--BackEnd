const NewSchedule = require("../Models/NewSchedule")

const GetSchedule = async (req, res) => {
  const authorization = req.user;
  const Class =  authorization.speciality[0].name;
  const Year = authorization.speciality[0].Year;
  const schedule = await NewSchedule.findOne({ Class ,Year})
  
  if (!schedule)
    return res.status(401).json({ message: "Error getting the schedule" })
  
  return res.status(201).json(schedule)
}

const updateSchedule = async (req, res) => {
  const authorization = req.user;
  const Class =  authorization.speciality[0].name;
  const Year = authorization.speciality[0].Year;
  
  await NewSchedule.deleteOne({Class,Year})
  createSchedule(req,res)
}

const createSchedule = async (req, res) => {
  const { modules, Classrooms, types } = req.body

  const authorization = req.user;
  const Class =  authorization.speciality[0].name;
  const Year = authorization.speciality[0].Year;

  const newSchedule = await NewSchedule.create({ Class,modules, Classrooms, types,Year })
  
  if (!newSchedule)
    return res.status(400).json({ message: "Error creating newSchedule" })

  return res.status(201).json({message:"newSchedule created"})
}


module.exports = { GetSchedule, createSchedule,updateSchedule }