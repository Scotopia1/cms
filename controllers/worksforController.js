const WorksforService = require('../services/worksforService');

const worksForController = {

    /**
     * Get all works for
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getAllWorksFor: async (req, res) => {
        try {
            const worksFor = await WorksforService.getAllWorksFor();
            res.status(200).json(worksFor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Get all projects for a specific member
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getProjectsByMember: async (req, res) => {
        try {
            const memberId = req.params.MemberID;
            const projects = await WorksforService.getProjectsByMember(memberId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Get all members for a specific project
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getMembersByProject: async (req, res) => {
        try {
            const projectId = req.params.ProjectID;
            const members = await WorksforService.getMemberByProject(projectId);
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Get a specific member by project
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getMemberByProject: async (req, res) => {
        try {
            const projectId = req.params.ProjectID;
            const memberId = req.params.MemberID;
            const member = await WorksforService.getMemberByProject(projectId, memberId);
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Assign a member to a project
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    assignMemberToProject: async (req, res) => {
        try {
            const { MemberID, ProjectID } = req.body;
            if (!MemberID || !ProjectID) {
                return res.status(400).json({ message: 'MemberID and ProjectID are required' });
            }
            const newWorksFor = await WorksforService.assignMemberToProject(MemberID, ProjectID);
            res.status(201).json(newWorksFor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Unassign a member from a project
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    unassignMemberFromProject: async (req, res) => {
        try {
            const { MemberID, ProjectID } = req.body;
            if (!MemberID || !ProjectID) {
                return res.status(400).json({ message: 'MemberID and ProjectID are required' });
            }
            await WorksforService.unassignMemberFromProject(MemberID, ProjectID);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = worksForController;