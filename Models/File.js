const mongoose = require("mongoose")

const Schema = mongoose.Schema

const FileSchema = new Schema({
  Module:{
    type: String,
    required:true
  },
  Chapter: {
    type: String
  },
  Teacher: {
    type: String,
    required:true
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
  },
  speciality: {
    type: String,
    required:true
  },
  Year:{
    type: String,
    required:true
  }
})

module.exports = mongoose.model("File" ,FileSchema)