const Task  = require('../models/taskModel');
const TaskService = require('../services/taskService');

const TaskController = {

    /**
     * Get all tasks by project ID
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getTasksByProjectId(req, res) {
        try {
            const projectId = req.params.ProjectID;
            const tasks = await TaskService.getTasksByProjectId(projectId);
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Get task by title
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
   async getTaskByTitle(req, res) {
        try {
            const projectId = req.params.ProjectID;
            const taskTitle = req.params.Title;
            const task = await TaskService.getTaskByTitle(projectId, taskTitle);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Get task by ID
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async getTaskById(req, res) {
        try {
            const projectId = req.params.ProjectID;
            const taskId = req.params.TaskID;
            const task = await TaskService.getTaskById(projectId, taskId);
            res.status(200).json(task);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Create a new task
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async createTask(req, res) {
        try {
            const projectId = req.params.ProjectID;
            const {Title, Description, Priority, Deadline} = req.body;
            if (!Title || !Description || !Priority || !Deadline) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            const deadline = new Date(Deadline);
            let task = new Task(Title, Description, Priority, deadline, projectId);
            const newTask = await TaskService.createTask(projectId, task);
            res.status(201).json(newTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Update task by ID
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async updateTask(req, res) {
        try {
            const projectId = req.params.ProjectID;
            const taskId = req.params.TaskID;
            if (!taskId) {
                return res.status(400).json({ message: 'Task ID is required' });
            }
            const {Title, Description, Status, Priority, Deadline} = req.body;
            if (!Title || !Description || !Status || !Priority || !Deadline) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            let updatedData = {
                Title,
                Description,
                Status,
                Priority,
                Deadline
            };
            const updatedTask = await TaskService.updateTask(projectId, taskId, updatedData);
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Delete task by ID
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    async deleteTask(req, res) {
        try {
            const taskId = req.params.TaskID;
            if (!taskId) {
                return res.status(400).json({ message: 'Task ID is required' });
            }
            await TaskService.deleteTask(taskId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TaskController;