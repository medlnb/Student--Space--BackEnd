const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  speciality: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        Year: {
          type: String,
          required: true,
        },
        Module: {
          type: String,
        },
        Admin: {
          type: Boolean,
        },
      },
    ],
    required: true,
  },
});
module.exports = mongoose.model("User", UserSchema);
