const WorksforService = require('../services/worksforService');

const worksForController = {
    getAllWorksFor: async (req, res) => {
        try {
            const worksFor = await WorksforService.getAllWorksFor();
            res.status(200).json(worksFor);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProjectsByMember: async (req, res) => {
        try {
            const memberId = req.params.MemberID;
            const projects = await WorksforService.getProjectsByMember(memberId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMembersByProject: async (req, res) => {
        try {
            const projectId = req.params.ProjectID;
            const members = await WorksforService.getMemberByProject(projectId);
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

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