const Project = require('../models/projectModel');
const ProjectService = require('../services/projectService');

const ProjectController = {
    getProjectsbyCompanyId: async (req, res) => {
        const companyId = req.params.CompanyID;
        try {
            const projects = await ProjectService.getProjectsByCompanyId(companyId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

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

    getProjectDetails: async (req, res) => {
        const projectId = req.params.ProjectID;
        try {
            const project = await ProjectService.getProjectDetails(projectId);
            res.status(200).json(project);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    createProject: async (req, res) => {
        try {
            const CompanyID = req.params.CompanyID;
            const {Name, Description, StartDate, EndDate, Status} = req.body;
            if (!Name || !Description || !StartDate || !EndDate || !Status) {
                return res.status(400).json({message: 'All fields are required'});
            }
            const project = new Project(Name, Description, StartDate, EndDate, Status, CompanyID);
            const newProject = await ProjectService.createProject(project);
            res.status(201).json(newProject);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

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