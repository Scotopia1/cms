const db = require('../config/db');
const Manager = require("../models/managerModel");
const CompanyRepository = require("./companyRepository");
const MemberRepository = require("./memberRepository");

const ManagerRepository = {
    getAllManagers: async (CompanyID) => {
        try{
            let sql = `SELECT * FROM manager WHERE MemberID IN (SELECT MemberID FROM member WHERE CompanyID = ?)`;
            const rows = await db.query(sql, [CompanyID]);
            return rows.map(Manager.fromRow);
        }catch (error){
            throw new Error('Error fetching managers: ' + error.message);
        }
    },

    getManagerById: async (ManagerID) => {
        try{
            let sql = `SELECT * FROM manager WHERE ManagerID = ?`;
            const rows = await db.query(sql, [ManagerID]);
            return Manager.fromRow(rows[0]);
        }catch (error){
            throw new Error('Error fetching manager: ' + error.message);
        }
    },

    createManager: async (AdditionalResponsibility, MemberID, CompanyID) => {
        try{
            if(await CompanyRepository.companyExists(CompanyID)){
                return {error: 'Company does not exist'};
            }

            if(await MemberRepository.MemberExists(MemberID)){
                return {error: 'Member does not exist'};
            }

            if(await ManagerRepository.memberAlreadyManager(MemberID)){
                return {error: 'Member is already a manager'};
            }

            let sql = `INSERT INTO manager (AdditionalResponsibility, MemberID) VALUES (?, ?)`;
            const affectedRows = await db.query(sql, [AdditionalResponsibility, MemberID]);
            if (affectedRows === 0) {
                return {error: 'Failed to create manager'};
            }
            return {
                affectedRows: affectedRows,
                message: 'Manager created successfully',
            }

        }catch (error){
            throw new Error('Error creating manager: ' + error.message);
        }
    },

    updateManager: async (ManagerID, AdditionalResponsibility) => {
        try{
            if(!await ManagerRepository.managerExists(ManagerID)){
                return {error: 'Manager does not exist'};
            }
            let sql = `UPDATE manager SET AdditionalResponsibility = ? WHERE ManagerID = ?`;
            const affectedRows = await db.query(sql, [AdditionalResponsibility, ManagerID]);
            if (affectedRows === 0) {
                return {error: 'Failed to update manager'};
            }
            return {
                affectedRows: affectedRows,
                message: 'Manager updated successfully',
            }
        }catch (error){
            throw new Error('Error updating manager: ' + error.message);
        }
    },

    deleteManager: async (ManagerID) => {
        try{
            if(!await ManagerRepository.managerExists(ManagerID)){
                return {error: 'Manager does not exist'};
            }
            let sql = `DELETE FROM manager WHERE ManagerID = ?`;
            const affectedRows = await db.query(sql, [ManagerID]);
            if (affectedRows === 0) {
                return {error: 'Failed to delete manager'};
            }
            return {
                affectedRows: affectedRows,
                message: 'Manager deleted successfully',
            }
        }catch (error){
            throw new Error('Error deleting manager: ' + error.message);
        }
    },

    managerExists: async (ManagerID) => {
        try{
            let sql = `SELECT * FROM manager WHERE ManagerID = ?`;
            const rows = await db.query(sql, [ManagerID]);
            return rows.length > 0;
        }catch (error){
            throw new Error('Error checking manager existence: ' + error.message);
        }
    },

    memberAlreadyManager: async (MemberID) => {
        try{
            let sql = `SELECT * FROM manager WHERE MemberID = ?`;
            const rows = await db.query(sql, [MemberID]);
            return rows.length > 0;
        }catch (error){
            throw new Error('Error checking member existence: ' + error.message);
        }
    }
}

module.exports = ManagerRepository;