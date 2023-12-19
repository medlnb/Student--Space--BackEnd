const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PromotionSchema = new Schema({
  Speciality: {
    type: String,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required:true
  },
  Password: {
    type: String,
    required:true
  },
  Accepted: {
    type: Boolean,
    required: true
  },
  TeacherName:{
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Promotion" ,PromotionSchema)