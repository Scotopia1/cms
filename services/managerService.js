const managerRepository = require('../repositories/managerRepository');

class ManagerService {
    static async getAllManagers(CompanyID) {
        try {
            return await managerRepository.getAllManagers(CompanyID);
        } catch (error) {
            throw new Error('Error fetching managers: ' + error.message);
        }
    }

    static async getManagerById(ManagerID) {
        try {
            return await managerRepository.getManagerById(ManagerID);
        } catch (error) {
            throw new Error('Error fetching manager: ' + error.message);
        }
    }

    static async createManager(AdditionalResponsibility, MemberID, CompanyID) {
        try {
            return await managerRepository.createManager(AdditionalResponsibility, MemberID, CompanyID);
        } catch (error) {
            throw new Error('Error creating manager: ' + error.message);
        }
    }

    static async updateManager(ManagerID, AdditionalResponsibility) {
        try {
            return await managerRepository.updateManager(ManagerID, AdditionalResponsibility);
        } catch (error) {
            throw new Error('Error updating manager: ' + error.message);
        }
    }

    static async deleteManager(ManagerID) {
        try {
            return await managerRepository.deleteManager(ManagerID);
        } catch (error) {
            throw new Error('Error deleting manager: ' + error.message);
        }
    }
}

module.exports = ManagerService;