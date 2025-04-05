const handledbyRepository = require('../repositories/handledbyRepository');

const HandledbyService = {
    getAllHandledBy: async () => {
        try {
            return await handledbyRepository.getAllHandledBy();
        }catch (error) {
            throw new Error('Error fetching handled by data');
        }
    },

    getProjectsByManager: async (managerId) => {
        try {
            return await handledbyRepository.getProjectsByManager(managerId);
        }catch (error) {
            throw new Error('Error fetching projects by manager');
        }
    },

    getMangerByProject: async (projectId) => {
        try {
            return await handledbyRepository.getMangerByProject(projectId);
        }catch (error) {
            throw new Error('Error fetching manager by project');
        }
    },

    assignManagerToProject: async (managerId, projectId) => {
        try {
            return await handledbyRepository.assignManagerToProject(managerId, projectId);
        }catch (error) {
            throw new Error('Error assigning manager to project');
        }
    },

    updateHandledBy: async (managerId, projectId) => {
        try {
            return await handledbyRepository.updateHandledBy(managerId, projectId);
        }catch (error) {
            throw new Error('Error updating handled by data');
        }
    },

    unassignManagerFromProject: async (managerId, projectId) => {
        try {
            return await handledbyRepository.unassignManagerFromProject(managerId, projectId);
        }catch (error) {
            throw new Error('Error unassigning manager from project');
        }
    }
}

module.exports = HandledbyService;