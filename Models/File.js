const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FileSchema = new Schema({
  Module:{
    type: String
  },
  Chapter: {
    type: String
  },
  Teacher: {
    type: String
  },
  Link: {
    type: String
  },
  DescriptionClass: {
    type: String
  },
  ModuleDescription: {
    type: String
  },
  title: {
    type: String
  }
})

module.exports = mongoose.model("File" ,FileSchema)