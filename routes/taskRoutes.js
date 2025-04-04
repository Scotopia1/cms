const express = require('express');
const TasksController = require('../controllers/taskController');
const {validateTask, validateTaskId} = require('../validators/task.dto');
const {validateProjectId} = require('../validators/project.dto');

const router = express.Router();

// Get requests
router.get('/:ProjectID', validateProjectId, TasksController.getTasksByProjectId); // Get all tasks by project ID
router.get('/:ProjectID/:Title', validateProjectId, validateTask, TasksController.getTaskByTitle); // Get task by Title
router.get('/:ProjectID/:TaskID', validateProjectId, validateTaskId, TasksController.getTaskById); // Get task by ID


// Post requests
router.post('/:ProjectID', validateProjectId, validateTask, TasksController.createTask); // Create a task

// Put requests
router.put('/:ProjectID/:TaskID', validateProjectId, validateTaskId, TasksController.updateTask); // Update a task

// Delete requests
router.delete('/:TaskID', validateProjectId, validateTaskId, TasksController.deleteTask); // Delete a task

module.exports = router;