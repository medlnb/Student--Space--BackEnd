const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
  Days: {
    type: [
      {
        dayID: {
          type: Number,
          required: true,
        },
        Classname: {
          type: String,
          required: true,
        },
        Type: {
          type: String,
          required: true,
        },
        Classroom: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Speciality: {
    type: String,
    required: true,
  },
  Group: {
    type: String,
    required: true,
  },
  ClassTypes: {
    type: [String],
    required: true,
  },
  ClassRooms: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
