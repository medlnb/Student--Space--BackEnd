const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
  id:{
    type: Number,
    required: true
  },
  module: {
    type: String
  },
  Classroom: {
    type: String
  },
  type: {
    type: String
  }
})

module.exports = mongoose.model("Schedule" ,ScheduleSchema)