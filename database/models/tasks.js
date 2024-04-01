const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
