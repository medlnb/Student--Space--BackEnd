const File = require("../Models/File")


const CreateFile = async (req, res) => {
  const {Module,Chapter,Teacher,Link,DescriptionClass,ModuleDescription,title,speciality,Year} = req.body
  
  const file = await File.create({Module,Chapter,Teacher,Link,DescriptionClass,ModuleDescription,title,speciality,Year}) 

  if (!file)
    return res.status(404).json({ err: "Error Creating the File" })
  
  return res.status(201).json(file)
}

const GetModules = async (req, res) => { 
  const FilePerPage = 2
  const { speciality, Year, p } = req.body 
  const Page = p || 0
  const Modules = await File.find({speciality,Year}).skip(Page * FilePerPage).limit(FilePerPage)
   res.status(201).json(Modules)
}
module.exports = {
  CreateFile,GetModules
}