const File = require("../Models/File");

const CreateFile = async (req, res) => {
  const {  Chapter, Link, DescriptionClass, ModuleDescription, title,specIndex } =
    req.body;
  const authorization = req.user;
  const speciality = authorization.speciality[specIndex].name;
  const Year = authorization.speciality[specIndex].Year;
  const Module = authorization.speciality[specIndex].Module;
  
  const Teacher = authorization.username;
  if (!Module || !Chapter || !Teacher || !title || !speciality || !Year)
    return res.status(404).json({
      err: "Module, Chapter, Teacher, title, speciality, Year r required.",
    });
  const file = await File.create({
    Module,
    Chapter,
    Teacher,
    Link,
    DescriptionClass,
    ModuleDescription,
    title,
    speciality,
    Year,
  });

  if (!file) return res.status(404).json({ err: "Error Creating the File" });
  return res.status(201).json(file);
};

const GetModules = async (req, res) => {
  const FilePerPage = 2;
  const authorization = req.user;
  const { p } = req.params;
  const speciality = authorization.speciality[0].name;
  const Year = authorization.speciality[0].Year;
  const Page = p || 0;
  const Modules = await File.find({ speciality, Year })
    .skip(Page * FilePerPage)
    .limit(FilePerPage);
  res.status(201).json(Modules);
};
module.exports = {
  CreateFile,
  GetModules,
};
