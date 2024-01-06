const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  speciality: {
    type: Array,
    required:true
  },
  Module: {
    type:String
  }
})

module.exports = mongoose.model("User" ,UserSchema)