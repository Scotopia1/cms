const TaskMemberService = require('../services/taskMemberService');

const taskMemberController = {
    getAllTaskMembers: async (req, res) => {
        try {
            const taskMembers = await TaskMemberService.getAllTaskMembers();
            res.status(200).json(taskMembers);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    getMemberAssignedToTask: async (req, res) => {
        const {TaskID} = req.params;
        try {
            const members = await TaskMemberService.getMemberAssignedToTask(TaskID);
            res.status(200).json(members);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    getTaskAssignedToMember: async (req, res) => {
        const {MemberID} = req.params;
        try {
            const tasks = await TaskMemberService.getTaskAssignedToMember(MemberID);
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    getTaskAssignedToMemberDetails: async (req, res) => {
        const {MemberID, TaskID} = req.params;
        try {
            const tasks = await TaskMemberService.getTaskAssignedToMemberDetails(MemberID, TaskID);
            res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    assignMemberToTask: async (req, res) => {
        const {TaskID, MemberID} = req.params;
        try {
            const result = await TaskMemberService.assignMemberToTask(TaskID, MemberID);
            if (result) {
                res.status(201).json({message: 'Member assigned to task successfully'});
            } else {
                res.status(400).json({message: 'Failed to assign member to task'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    unassignMemberFromTask: async (req, res) => {
        const {TaskID, MemberID} = req.query;
        try {
            const result = await TaskMemberService.unassignMemberFromTask(TaskID, MemberID);
            if (result) {
                res.status(200).json({message: 'Member unassigned from task successfully'});
            } else {
                res.status(400).json({message: 'Failed to unassign member from task'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = taskMemberController;