const taskModel = require("../database/models/tasks");
const userModel = require("../database/models/users");
const { getSessionId } = require('../utils/sessionUtil');


exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find({}).populate("users");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: "Server error" });
    console.error(error);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Server error" });
    console.error(error);
  }
};

exports.postTask = async (req, res) => {
  const session_user = await getSessionId(req.body.users);
  const tasks = new taskModel({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    users: session_user,
  });
  try {
    const task = await tasks.save();

    const taskId = task._id;

    await userModel.updateOne(
      { _id: session_user },
      { $push: { tasks: taskId } }
    );
    res.status(201).json(task);
    console.log("Task added!");
  } catch (error) {
    res.status(400).json({ message: "Server error" });
    console.error(error);
  }
};

exports.updateTask = async (req, res) => {
  try {
    await taskModel.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    );
    res.status(200).json({ message: "Updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error occurred!" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await taskModel.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: "Error occurred!" });
  }
};
