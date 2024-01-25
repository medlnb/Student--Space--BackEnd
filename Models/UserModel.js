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
        Admin: {
          type: Boolean,
        },
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
        Group: {
          type: [String] || String,
          required: true,
        },
      },
    ],
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
