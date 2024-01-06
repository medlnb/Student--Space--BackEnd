const mongoose = require("mongoose")

const Schema = mongoose.Schema

const TaskSchema = new Schema({
  className: {
    type: String,
    required: true
  },
  taskTitle: {
    type: String,
    required: true
  },
  Description: {
    type: String,
  },
  Link: {
    type:String
  },
  deadLine: {
    type: Object,
    required: true
  },
  speciality: {
    type: String
  }
})

module.exports = mongoose.model("Task" ,TaskSchema)