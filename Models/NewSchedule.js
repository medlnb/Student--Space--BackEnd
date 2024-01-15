const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewScheduleSchema = new Schema({
  modules: {
    type: [String],
    required: true,
  },
  Classrooms: {
    type: [String],
    required: true,
  },
  types: {
    type: [String],
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  Group: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("NewSchedule", NewScheduleSchema);
