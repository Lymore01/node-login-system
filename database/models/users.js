const mongoose = require("mongoose");
const taskModel = require("../models/tasks")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  profile: {
    type: String
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task"
  }]
}, {
  timestamps: true // Automatically add createdAt and updatedAt fields
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
