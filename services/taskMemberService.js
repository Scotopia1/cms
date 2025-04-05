const TaskMemberRepository = require('../repositories/taskMemberRepository');

const TaskMemberService = {
    getAllTaskMembers: async () => {
        try {
            return await TaskMemberRepository.getAllTaskMembers();
        } catch (error) {
            console.error('Error fetching all task members:', error);
            throw error;
        }
    },

    getMemberAssignedToTask: async (TaskID) => {
        try {
            return await TaskMemberRepository.getMemberAssignedToTask(TaskID);
        } catch (error) {
            console.error('Error fetching members assigned to task:', error);
            throw error;
        }
    },

    getTaskAssignedToMember: async (MemberID) => {
        try {
            return await TaskMemberRepository.getTaskAssignedToMember(MemberID);
        } catch (error) {
            console.error('Error fetching tasks assigned to member:', error);
            throw error;
        }
    },

    getTaskAssignedToMemberDetails: async (MemberID, TaskID) => {
        try {
            return await TaskMemberRepository.getTaskAssignedToMemberDetails(MemberID, TaskID);
        } catch (error) {
            console.error('Error fetching task details assigned to member:', error);
            throw error;
        }
    },

    assignMemberToTask: async (TaskID, MemberID) => {
        try {
            return await TaskMemberRepository.assignMemberToTask(TaskID, MemberID);
        } catch (error) {
            console.error('Error assigning member to task:', error);
            throw error;
        }
    },

    unassignMemberFromTask: async (TaskID, MemberID) => {
        try {
            return await TaskMemberRepository.unassignMemberFromTask(TaskID, MemberID);
        } catch (error) {
            console.error('Error unassigning member from task:', error);
            throw error;
        }
    },
}

module.exports = TaskMemberService;