const db = require('../config/db');
const Task = require('../models/taskModel');
const ProjectRepository = require('./projectRepository');

const TaskRepository = {
    getTasksByProjectId: async (projectId) => {
        try{
            let sql = `SELECT * FROM task WHERE ProjectID = ?`;
            const rows = await db.query(sql, [projectId]);
            console.log(rows);
            return rows.map(Task.fromRow);
        }catch (error){
            throw new Error('Error fetching tasks by project ID');
        }
    },

    getTaskByTitle: async (projectId, taskTitle) => {
        try{
            let sql = `SELECT * FROM task WHERE ProjectID = ? AND Title = ?`;
            const rows = await db.query(sql, [projectId, taskTitle]);
            console.log(rows);
            return rows.map(Task.fromRow);
        }catch (error){
            throw new Error('Error fetching task by title');
        }
    },

    getTaskById: async (projectId, taskId) => {
        try{
            let sql = `SELECT * FROM task WHERE ProjectID = ? AND TaskID = ?`;
            const rows = await db.query(sql, [projectId, taskId]);
            console.log(rows);
            return rows.map(Task.fromRow);
        }catch (error){
            throw new Error('Error fetching task by ID');
        }
    },

    createTask: async (projectId, task) => {
        try{
            if (!(await ProjectRepository.projectExists(projectId))) {
                return {
                    message: 'Project does not exist'
                }
            }
            let sql = `INSERT INTO task (Title, Description, Status, ProjectID, Priority, Deadline) VALUES (?, ?, ?, ?, ?, ?)`;
            const {affectedRows} = await db.query(sql, [
                task.Title,
                task.Description,
                task.Status,
                projectId,
                task.Priority,
                task.Deadline]);
            return {
                affectedRows: affectedRows,
                message: 'Task created successfully'
            };
        }catch (error){
            throw new Error('Error creating task');
        }
    },

    updateTask: async (projectId, taskId, updatedData) => {
        try{
            if (!(await ProjectRepository.projectExists(projectId))) {
                return {
                    message: 'Project does not exist'
                }
            }
            let sql = `UPDATE task SET Title = ?, Description = ?, Status = ?, Priority = ?, Deadline = ? WHERE ProjectID = ? AND TaskID = ?`;
            const {affectedRows} = await db.query(sql, [
                updatedData.Title,
                updatedData.Description,
                updatedData.Status,
                updatedData.Priority,
                updatedData.Deadline,
                projectId,
                taskId]);
            return {
                affectedRows: affectedRows,
                message: 'Task updated successfully'
            };
        }catch (error){
            throw new Error('Error updating task');
        }
    },

    deleteTask: async (projectId, taskId) => {
        try{
            let sql = `DELETE FROM task WHERE ProjectID = ? AND TaskID = ?`;
            const {affectedRows} = await db.query(sql, [projectId, taskId]);
            return {
                affectedRows: affectedRows,
                message: 'Task deleted successfully'
            };
        }catch (error){
            throw new Error('Error deleting task');
        }
    },

    isTask: async (taskId) => {
        try {
            let sql = `SELECT *
                       FROM task
                       WHERE TaskID = ?`;
            const rows = await db.query(sql, [taskId]);
            return rows.length > 0;
        } catch (error) {
            throw new Error('Error checking if task exists');
        }
    }
}

module.exports = TaskRepository;