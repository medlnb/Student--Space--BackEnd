const Schedule = require("../Models/Schedule");

const GetSchedule = async (req, res) => {
  const { tableinfo } = req.params;

  const Group = tableinfo.substring(1);
  const specIndex = tableinfo[0];
  const spec = req.user.speciality[specIndex];
  const Speciality = spec.name;
  const Year = spec.Year;
  const schedule = await Schedule.findOne({ Speciality, Year, Group });

  if (!schedule)
    return res.status(404).json({ message: "Error getting the schedule" });

  return res.status(201).json(schedule);
};

const GetGroupsSchedules = async (req, res) => {
  const specIndex = req.params.tableinfo;
  const spec = req.user.speciality[specIndex];
  const Speciality = spec.name;
  const Year = spec.Year;
  const schedule = await Schedule.find({ Speciality, Year });

  if (!schedule)
    return res.status(401).json({ message: "Error getting the schedule" });

  const Groups = schedule.map((group) => group.Group);
  return res.status(201).json(Groups);
};

const updateSchedule = async (req, res) => {
  const { tableinfo } = req.params;

  const Group = tableinfo.substring(1);
  const specIndex = tableinfo[0];
  const spec = req.user.speciality[specIndex];
  const Speciality = spec.name;
  const Year = spec.Year;

  const { Days } = req.body;

  const newSchedule = await Schedule.updateOne(
    { Speciality, Year, Group },
    { Days }
  );

  if (!newSchedule)
    return res.status(400).json({ message: "Error updating newSchedule" });

  return res.status(201).json({ message: "newSchedule updated" });
};

const createSchedule = async (req, res) => {
  const { Days } = req.body;
  const { tableinfo } = req.params;

  const Group = tableinfo.substring(1);
  const specIndex = tableinfo[0];
  const SpecialityInfo = req.user.speciality[specIndex];
  const Speciality = SpecialityInfo.name;
  const Year = SpecialityInfo.Year;

  const newSchedule = await Schedule.create({
    Days,
    Speciality,
    Year,
    Group,
  });

  if (!newSchedule)
    return res.status(400).json({ message: "Error creating newSchedule" });

  return res.status(201).json({ message: "newSchedule created" });
};

module.exports = {
  GetSchedule,
  createSchedule,
  updateSchedule,
  GetGroupsSchedules,
};
