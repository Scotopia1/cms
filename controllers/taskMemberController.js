const TaskMemberService = require('../services/taskMemberService');

const taskMemberController = {

    /**
     * Get all task members
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getAllTaskMembers: async (req, res) => {
        try {
            const taskMembers = await TaskMemberService.getAllTaskMembers();
            res.status(200).json(taskMembers);
        } catch (error) {
            console.error(error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    /**
     * Get all members assigned to a specific task
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
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

    /**
     * Get all tasks assigned to a specific member
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
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

    /**
     * Get details of a specific task assigned to a specific member
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
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

    /**
     * Assign a member to a task
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    assignMemberToTask: async (req, res) => {
        const {TaskID, MemberID} = req.body;
        if (!TaskID || !MemberID) {
            return res.status(400).json({error: 'TaskID and MemberID are required'});
        }
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

    /**
     * Unassign a member from a task
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    unassignMemberFromTask: async (req, res) => {
        const {TaskID, MemberID} = req.body;
        if (!TaskID || !MemberID) {
            return res.status(400).json({error: 'TaskID and MemberID are required'});
        }
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