const Project = require('../models/projectModel');
const ProjectService = require('../services/projectService');

const ProjectController = {

    /**
     * Get all projects by company ID
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getProjectsbyCompanyId: async (req, res) => {
        const companyId = req.params.CompanyID;
        try {
            const projects = await ProjectService.getProjectsByCompanyId(companyId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Get project by name
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getProjectByName: async (req, res) => {
        const companyId = req.params.CompanyID;
        const projectName = req.params.name;
        try {
            const project = await ProjectService.getProjectByName(companyId, projectName);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Get project by ID
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getProjectDetails: async (req, res) => {
        const projectId = req.params.ProjectID;
        try {
            const project = await ProjectService.getProjectDetails(projectId);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Create a new project
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    createProject: async (req, res) => {
        try {
            const CompanyID = req.params.CompanyID;
            const {Name, Description, Status} = req.body;
            if (!Name || !Description || !Status) {
                return res.status(400).json({message: 'All fields are required'});
            }
            const project = new Project(Name, Description, Status, CompanyID);
            const newProject = await ProjectService.createProject(project);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Update project by ID
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    updateProject: async (req, res) => {
        const projectId = req.params.ProjectID;
        const projectData = req.body;
        try {
            const updatedProject = await ProjectService.updateProject(projectId, projectData);
            res.status(200).json(updatedProject);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    /**
     * Delete project by ID
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    deleteProject: async (req, res) => {
        const projectId = req.params.ProjectID;
        try {
            await ProjectService.deleteProject(projectId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }
}

module.exports = ProjectController;