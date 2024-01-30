const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RequestSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true
  },
  Speciality: {
    type: Object,
    required: true
  },
  Year:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model("Request" ,RequestSchema)