const ManagerService = require('../services/managerService');
const {Manager} = require('../models/managerModel');

class ManagerController {

    /**
     * Get all managers for a specific company
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async getManagers(req, res) {
        try {
            const { CompanyID } = req.params;
            const managers = await ManagerService.getAllManagers(CompanyID);
            res.status(200).json(managers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Get a specific manager by ID
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async getManagerById(req, res) {
        try {
            const { ManagerID } = req.params;
            const manager = await ManagerService.getManagerById(ManagerID);
            if (!manager) {
                return res.status(404).json({ message: 'Manager not found' });
            }
            res.status(200).json(manager);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Create a new manager for a specific company
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    static async createManager(req, res) {
        try {
            const { CompanyID } = req.params;
            const { AdditionalResponsibility, MemberID } = req.body;
            const newManager = await ManagerService.createManager(AdditionalResponsibility, MemberID, CompanyID);
            res.status(201).json(newManager);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Update a manager's additional responsibility
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async updateManager(req, res) {
        try {
            const { ManagerID } = req.params;
            const { AdditionalResponsibility } = req.body;
            const updatedManager = await ManagerService.updateManager(ManagerID, AdditionalResponsibility);
            if (!updatedManager) {
                return res.status(404).json({ message: 'Manager not found' });
            }
            res.status(200).json(updatedManager);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * Delete a manager
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    static async deleteManager(req, res) {
        try {
            const { ManagerID } = req.params;
            const deletedManager = await ManagerService.deleteManager(ManagerID);
            if (!deletedManager) {
                return res.status(404).json({ message: 'Manager not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ManagerController;