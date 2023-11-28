const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RequestSchema = new Schema({
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
  },
  Speciality: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Request" ,RequestSchema)