const File = require("../Models/File")


const CreateFile = async (req, res) => {
  const {Module,Chapter,Teacher,Type,Link,DescriptionClass,ModuleDescription,title,speciality} = req.body
  
  const file = await File.create({Module,Chapter,Teacher,Type,Link,DescriptionClass,ModuleDescription,title,speciality}) 

  if (!file)
    return res.status(404).json({ err: "Error Creating the File" })
  
  return res.status(201).json(file)
}

const GetModules = async (req, res) => { 
  const Page = req.params.p || 0
  const FilePerPage = 2

  const Modules = await File.find({speciality:"MASTER@1@Artificial Intelligence & Data Science"}).skip(Page * FilePerPage).limit(FilePerPage)
   res.status(201).json(Modules)
}
module.exports = {
  CreateFile,GetModules
}