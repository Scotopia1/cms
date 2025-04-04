const ProjectRepository = require('../repositories/projectRepository');

const ProjectService = {
    getProjectsByCompanyId: async (companyId) => {
        try {
            return await ProjectRepository.getProjectsByCompanyId(companyId);
        } catch (error) {
            throw new Error('Error fetching projects');
        }
    },

    getProjectByName: async (companyId, projectName) => {
        try {
            return await ProjectRepository.getProjectByName(companyId, projectName);
        } catch (error) {
            throw new Error('Error fetching project');
        }
    },

    getProjectDetails: async (projectId) => {
        try {
            return await ProjectRepository.getProjectDetails(projectId);
        } catch (error) {
            throw new Error('Error fetching project details');
        }
    },

    createProject: async (project) => {
        try {
            return await ProjectRepository.createProject(project);
        } catch (error) {
            throw new Error('Error creating project');
        }
    },

    updateProject: async (projectId, projectData) => {
        try {
            return await ProjectRepository.updateProject(projectId, projectData);
        } catch (error) {
            throw new Error('Error updating project');
        }
    },

    deleteProject: async (projectId) => {
        try {
            return await ProjectRepository.deleteProject(projectId);
        } catch (error) {
            throw new Error('Error deleting project');
        }
    }
}

module.exports = ProjectService;