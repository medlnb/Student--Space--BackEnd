const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AnnouncementSchema = new Schema({
  Publisher:{
    type: String,
    required:true
  },
  Content:{
    type: String,
    required:true
  },
  Date:{
    type: Date,
    required:true
  },
  speciality: {
    type: String,
    required:true
  },
  Year: {
    type: String,
    required:true
  },
},{ timestamps: true })

module.exports = mongoose.model("Announcement" ,AnnouncementSchema)