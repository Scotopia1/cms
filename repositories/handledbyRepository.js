const db = require('../config/db');
const ManagerRepository = require('./managerRepository');
const ProjectRepository = require('./projectRepository');
const Project = require('../models/projectModel');
const Manager = require('../models/managerModel');

const HandledbyRepository = {
    getAllHandledBy: async () => {
        try {
            const sql = 'SELECT * FROM handled_by';
            const [rows] = await db.query(sql);
            return rows;
        }catch (error) {
            throw new Error('Error fetching handled by data');
        }
    },

    getProjectsByManager: async (managerId) => {
        try {

            // Check if the manager exists
            if (! await ManagerRepository.managerExists(managerId)) {
                return { message: 'Manager not found' };
            }

            const sql = 'SELECT * FROM project WHERE ProjectID IN (SELECT ProjectID FROM handled_by WHERE ManagerID = ?)';
            const [rows] = await db.query(sql, [managerId]);
            return rows(Project.fromRow);
        }catch (error) {
            throw new Error('Error fetching projects by manager');
        }
    },

    getMangerByProject: async (projectId) => {
        try {

            // Check if the project exists
            if (! await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            const sql = 'SELECT * FROM manager WHERE ManagerID IN (SELECT ManagerID FROM handled_by WHERE ProjectID = ?)';
            const [rows] = await db.query(sql, [projectId]);
            return Manager.fromRow(rows[0]);
        }catch (error) {
            throw new Error('Error fetching manager by project');
        }
    },

    assignManagerToProject: async (managerId, projectId) => {
        try {

            // Check if the manager exists
            if (! await ManagerRepository.managerExists(managerId)) {
                return { message: 'Manager not found' };
            }

            // Check if the project exists
            if (! await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            // Check if the manager is already handling the project
            if (await HandledbyRepository.AlreadyHandledBy(managerId, projectId)) {
                return { message: 'Manager already assigned to this project' };
            }

            const sql = 'INSERT INTO handled_by (ManagerID, ProjectID) VALUES (?, ?)';
            const affectedRows = await db.query(sql, [managerId, projectId]);
            return {
                affectedRows: affectedRows,
                message: 'Manager assigned to project successfully',
            };
        }catch (error) {
            throw new Error('Error assigning manager to project');
        }
    },

    updateHandledBy: async (managerId, projectId) => {
        try {
            // Check if the manager exists
            if (! await ManagerRepository.managerExists(managerId)) {
                return { message: 'Manager not found' };
            }

            // Check if the project exists
            if (! await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            // Check if the manager is already handling the project
            if (await HandledbyRepository.AlreadyHandledBy(managerId, projectId)) {
                return { message: 'Manager is already assigned to this project' };
            }

            const sql = 'UPDATE handled_by SET ManagerID = ? WHERE ProjectID = ?';
            const affectedRows = await db.query(sql, [managerId, projectId]);
            return {
                affectedRows: affectedRows,
                message: 'Handled by data updated successfully',
            };
        }catch (error) {
            throw new Error('Error updating handled by data');
        }
    },

    unassignManagerFromProject: async (managerId, projectId) => {
        try {
            // Check if the manager exists
            if (! await ManagerRepository.managerExists(managerId)) {
                return { message: 'Manager not found' };
            }

            // Check if the project exists
            if (! await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            // Check if the manager is already handling the project
            if (! await HandledbyRepository.AlreadyHandledBy(managerId, projectId)) {
                return { message: 'Manager is not assigned to this project' };
            }

            const sql = 'DELETE FROM handled_by WHERE ManagerID = ? AND ProjectID = ?';
            const affectedRows = await db.query(sql, [managerId, projectId]);
            return {
                affectedRows: affectedRows,
                message: 'Manager unassigned from project successfully',
            };
        }catch (error) {
            throw new Error('Error unassigning manager from project');
        }
    },

    AlreadyHandledBy: async (managerId, projectId) => {
        try {
            const sql = 'SELECT * FROM handled_by WHERE ManagerID = ? AND ProjectID = ?';
            const [rows] = await db.query(sql, [managerId, projectId]);
            return rows.length > 0;
        }catch (error) {
            throw new Error('Error checking if manager is already handling project');
        }
    }
}

module.exports = HandledbyRepository;