const TaskRepository = require('../repositories/taskRepository');

const TaskService = {
    async getTasksByProjectId(projectId) {
        try {
            return await TaskRepository.getTasksByProjectId(projectId);
        } catch (error) {
            throw new Error('Error fetching tasks by project ID');
        }
    },

    async getTaskByTitle(projectId, taskTitle) {
        try {
            return await TaskRepository.getTaskByTitle(projectId, taskTitle);
        } catch (error) {
            throw new Error('Error fetching task by title');
        }
    },

    async getTaskById(projectId, taskId) {
        try {
            return await TaskRepository.getTaskById(projectId, taskId);
        } catch (error) {
            throw new Error('Error fetching task by ID');
        }
    },

    async createTask(projectId, taskData) {
        try {
            return await TaskRepository.createTask(projectId, taskData);
        } catch (error) {
            throw new Error('Error creating task');
        }
    },

    async updateTask(projectId, taskId, updatedData) {
        try {
            return await TaskRepository.updateTask(projectId, taskId, updatedData);
        } catch (error) {
            throw new Error('Error updating task');
        }
    },

    async deleteTask(projectId, taskId) {
        try {
            return await TaskRepository.deleteTask(projectId, taskId);
        } catch (error) {
            throw new Error('Error deleting task');
        }
    },
}

module.exports = TaskService;