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
  deadLine: {
    type: Object,
    required: true
  }
})

module.exports = mongoose.model("Task" ,TaskSchema)