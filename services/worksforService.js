const WorksforRepository = require('../repositories/worksforRepository');

const WorksforService = {
    getAllWorksFor: async () => {
        try {
            return await WorksforRepository.getAllWorksFor();
        } catch (error) {
            throw new Error('Error fetching works for data');
        }
    },

    getProjectsByMember: async (memberId) => {
        try {
            return await WorksforRepository.getProjectsByMember(memberId);
        } catch (error) {
            throw new Error('Error fetching projects by member');
        }
    },

    getMembersByProject: async (projectId) => {
        try {
            return await WorksforRepository.getMembersByProject(projectId);
        } catch (error) {
            throw new Error('Error fetching members by project');
        }
    },

    getMemberByProject: async (projectId, memberId) => {
        try {
            return await WorksforRepository.getMemberByProject(projectId, memberId);
        } catch (error) {
            throw new Error('Error fetching member by project');
        }
    },

    assignMemberToProject: async (memberId, projectId) => {
        try {
            return await WorksforRepository.assignMemberToProject(memberId, projectId);
        } catch (error) {
            throw new Error('Error assigning member to project');
        }
    },

    unassignMemberFromProject: async (memberId, projectId) => {
        try {
            return await WorksforRepository.unassignMemberFromProject(memberId, projectId);
        } catch (error) {
            throw new Error('Error unassigning member from project');
        }
    }
}

module.exports = WorksforService;