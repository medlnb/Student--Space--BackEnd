const mongoose = require("mongoose")

const Schema = mongoose.Schema

const NewScheduleSchema = new Schema({
  Class: {
    type:String
  },
  Group: {
    type:String
  },
  modules: {
    type: [String]
  },
  Classrooms: {
    type: [String]
  },
  types: {
    type: [String]
  }
})

module.exports = mongoose.model("NewSchedule" ,NewScheduleSchema)