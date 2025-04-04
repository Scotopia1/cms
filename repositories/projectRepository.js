const db = require('../config/db');
const Project = require('../models/projectModel');
const CompanyRepository = require('./companyRepository');

const ProjectRepository = {
    getProjectsByCompanyId: async (companyId) => {
        try {
            const rows = await db.query('SELECT * FROM project WHERE CompanyID = ?', [companyId]);
            return rows.map(Project.fromRow)[0];
        } catch (error) {
            throw new Error('Error fetching projects');
        }
    },

    getProjectByName: async (companyId, projectName) => {
        try {
            const rows = await db.query('SELECT * FROM project WHERE CompanyID = ? AND Name = ?', [companyId, projectName]);
            if (rows.length === 0) {
                return null;
            }
            return rows.map(Project.fromRow);
        } catch (error) {
            throw new Error('Error fetching project');
        }
    },

    getProjectDetails: async (projectId) => {
        try {
            const rows = await db.query('SELECT * FROM project WHERE ProjectID = ?', [projectId]);
            if (rows.length === 0) {
                return null;
            }
            return Project.fromRow(rows[0]);
        } catch (error) {
            throw new Error('Error fetching project details');
        }
    },

    createProject: async (project) => {
        try {
            if (!(await CompanyRepository.companyExists(project.CompanyID))) {
                return {
                    message: 'Company does not exist'
                }
            }
            let sql = `INSERT INTO project (Name, Description, StartDate, EndDate, Status, CompanyID) VALUES (?, ?, ?, ?, ?, ?)`;
            const {affectedRows} = await db.query(sql, [
                project.Name,
                project.Description,
                project.StartDate,
                project.EndDate,
                project.Status,
                project.CompanyID
            ]);

            console.log(affectedRows);
            return {
                affectedRows
            }
        } catch (error) {
            throw new Error('Error creating project');
        }
    },

    updateProject: async (projectId, projectData) => {
        try {
            if (!(await CompanyRepository.companyExists(projectData.CompanyID))) {
                return {
                    message: 'Company does not exist'
                }
            }
            let sql = `UPDATE project SET Name = ?, Description = ?, StartDate = ?, EndDate = ?, Status = ? WHERE ProjectID = ?`;
            const {affectedRows} = await db.query(sql, [
                projectData.Name,
                projectData.Description,
                projectData.StartDate,
                projectData.EndDate,
                projectData.Status,
                projectId
            ]);
            return {
                affectedRows
            };
        } catch (error) {
            throw new Error('Error updating project');
        }
    },

    deleteProject: async (projectId) => {
        try {
            let sql = `DELETE FROM project WHERE ProjectID = ?`;
            const {affectedRows} = await db.query(sql, [projectId]);
            return {
                affectedRows
            };
        } catch (error) {
            throw new Error('Error deleting project');
        }
    },

    projectExists: async (projectId) => {
        try {
            const sql = 'SELECT * FROM project WHERE ProjectID = ?';
            const rows = await db.query(sql, [projectId]);
            return rows.length > 0;
        } catch (error) {
            throw new Error('Error checking project existence');
        }
    }
}

module.exports = ProjectRepository;