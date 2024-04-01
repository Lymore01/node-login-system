// handle all imports
const express = require("express");
const taskRoute = express.Router();
const taskController = require("../controllers/taskController")



taskRoute.get('/all', taskController.getAllTasks);
taskRoute.get('/:id', taskController.getTaskById);
taskRoute.post('/post-task', taskController.postTask);
taskRoute.put('/update/:id', taskController.updateTask);
taskRoute.delete('/delete/:id', taskController.deleteTask);



module.exports = taskRoute;
