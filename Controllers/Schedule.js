const Schedule = require("../Models/Schedule")

const GetSchedule = async (req, res) => { 
  const schedule = await Schedule.find().sort({ id: 1 })
  if (!schedule)
    return res.status(404).json({ err: "Error getting the Schedule" })

  const array1 = []
  const array2 = []
  const array3 = []
  const array4 = []
  const array5 = []
  const array6 = []

  schedule.map((element,index) => {
    if (index < 6)
      array1.push(element)
    else if (index < 12)
      array2.push(element)
    else if (index < 18)
      array3.push(element)
    else if (index < 24)
      array4.push(element)
    else if (index < 30)
      array5.push(element)
    else
      array6.push(element)
  })
  return res.status(201).json([array1,array2,array3,array4,array5,array6])
}

const updateSchedule =async (req,res) => {
  const del = await Schedule.deleteMany()
  const all = req.body.flat().sort((a, b) => a.id - b.id);

  all.map(async(day) => {
    const { id, module, Classroom, type } = day
    let Day = null
    Day = await Schedule.create({ id, module, Classroom, type })  
    if (!Day)
      return res.status(401).json({err:"Error Updating"})
  })
  
  return res.status(201).json({ msg: "Schedule Updated" })
}

const createDays = async (req, res) => {
  const all = req.body
  all.map(async(day) => {
    const { id, module, Classroom, type } = day
    const Day = await Schedule.create( { id, module, Classroom,type })  
  })
  
  return res.status(201).json({ msg: "Schedule Created" })
}


module.exports = { GetSchedule, createDays,updateSchedule }