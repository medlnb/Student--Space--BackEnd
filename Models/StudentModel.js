const mongoose = require("mongoose")

const Schema = mongoose.Schema

const StudentSchema = new Schema({
  matricule: {
    type: String,
    required: true,
    unique:true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Student" ,StudentSchema)