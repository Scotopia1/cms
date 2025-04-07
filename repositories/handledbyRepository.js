const db = require('../config/db');
const ManagerRepository = require('./managerRepository');
const ProjectRepository = require('./projectRepository');
const Project = require('../models/projectModel');
const Manager = require('../models/managerModel');

const HandledbyRepository = {

    /**
     * Fetch all handled by data
     * @returns {Promise<*>}
     */
    getAllHandledBy: async () => {
        try {
            const sql = 'SELECT * FROM handled_by';
            const [rows] = await db.query(sql);
            return rows;
        }catch (error) {
            throw new Error('Error fetching handled by data');
        }
    },

    /**
     * Fetch all projects handled by a specific manager
     * @param managerId
     * @returns {Promise<*|{message: string}>}
     */
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

    /**
     * Fetch all managers handling a specific project
     * @param projectId
     * @returns {Promise<Manager|{message: string}>}
     */
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

    /**
     * Assign a manager to a project
     * @param managerId
     * @param projectId
     * @returns {Promise<{message: string}|{affectedRows: any, message: string}>}
     */
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

    /**
     * Update the manager handling a project
     * @param managerId
     * @param projectId
     * @returns {Promise<{message: string}|{affectedRows: any, message: string}>}
     */
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

    /**
     * Unassign a manager from a project
     * @param managerId
     * @param projectId
     * @returns {Promise<{message: string}|{affectedRows: any, message: string}>}
     */
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

    /**
     * Check if a manager is already handling a project
     * @param managerId
     * @param projectId
     * @returns {Promise<boolean>}
     * @constructor
     */
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