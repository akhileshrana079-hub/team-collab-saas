const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");

const {createTask,getTasks,getTask,updateTask,deleteTask,updateTaskStatus,assignTask,} = require("../controllers/task.controller");

router.use(protect);

router.post('/projects/:projectId/tasks', createTask);
router.get('/projects/:projectId/tasks', getTasks);
router.get('/tasks/:taskId', getTask);
router.patch('/tasks/:taskId', updateTask);
router.delete('/tasks/:taskId', deleteTask);
router.patch('/tasks/:taskId/status', updateTaskStatus);
router.patch('/tasks/:taskId/assign', assignTask);


module.exports = router;