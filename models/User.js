const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
    max: 150,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
