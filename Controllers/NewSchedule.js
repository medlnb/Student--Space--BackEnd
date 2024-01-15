const NewSchedule = require("../Models/NewSchedule");

const GetSchedule = async (req, res) => {
  const authorization = req.user;
  const { info } = req.params;
  const specIndex = parseInt(info[0]);
  const Group = info.substring(1);
  const Class = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;
  const schedule = await NewSchedule.findOne({ Class, Year, Group });

  if (!schedule)
    return res.status(401).json({ message: "Error getting the schedule" });

  return res.status(201).json(schedule);
};

const updateSchedule = async (req, res) => {
  const authorization = req.user;
  const { specIndex } = req.params;
  const Class = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;

  await NewSchedule.deleteOne({ Class, Year });
  createSchedule(req, res);
};

const createSchedule = async (req, res) => {
  const { modules, Classrooms, types } = req.body;
  const { specIndex } = req.params;
  const authorization = req.user;
  const Class = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;

  const newSchedule = await NewSchedule.create({
    Class,
    modules,
    Classrooms,
    types,
    Year,
  });

  if (!newSchedule)
    return res.status(400).json({ message: "Error creating newSchedule" });

  return res.status(201).json({ message: "newSchedule created" });
};

module.exports = { GetSchedule, createSchedule, updateSchedule };
