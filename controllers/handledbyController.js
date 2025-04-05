const HandledbyService = require('../services/handledbyService');

const handledByController = {
    getAllHandledBy: async (req, res) => {
        try {
            const handledBy = await HandledbyService.getAllHandledBy();
            res.status(200).json(handledBy);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getProjectsByManager: async (req, res) => {
        try {
            const managerId = req.params.ManagerID;
            const projects = await HandledbyService.getProjectsByManager(managerId);
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMangerByProject: async (req, res) => {
        try {
            const projectId = req.params.ProjectID;
            const manager = await HandledbyService.getMangerByProject(projectId);
            res.status(200).json(manager);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    assignManagerToProject: async (req, res) => {
        try {
            const { ManagerID, ProjectID } = req.body;
            if  (!ManagerID || !ProjectID) {
                return res.status(400).json({ message: 'ManagerID and ProjectID are required' });
            }
            const newHandledBy = await HandledbyService.assignManagerToProject(ManagerID, ProjectID);
            res.status(201).json(newHandledBy);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateHandledBy: async (req, res) => {
        try {
            const { ManagerID, ProjectID } = req.body;
            if (!ManagerID || !ProjectID) {
                return res.status(400).json({ message: 'ManagerID and ProjectID are required' });
            }
            const updatedHandledBy = await HandledbyService.updateHandledBy(ManagerID, ProjectID);
            res.status(200).json(updatedHandledBy);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    unassignManagerFromProject: async (req, res) => {
        try {
            const { ManagerID, ProjectID } = req.body;
            if (!ManagerID || !ProjectID) {
                return res.status(400).json({ message: 'ManagerID and ProjectID are required' });
            }
            await HandledbyService.unassignManagerFromProject(ManagerID, ProjectID);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = handledByController;