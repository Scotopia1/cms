const db = require('../config/db');
const Member = require('../models/memberModel');
const CompanyRepository = require('./companyRepository');
const Utils = require('../Utils/utils');

const MemberRepository = {

    /**
     * Fetch all members by company ID
     * @param companyId
     * @returns {Promise<*>}
     */
    getAllMembersByCompanyId: async (companyId) => {
        try {
            const sql = `SELECT * FROM member WHERE CompanyID = ?`;
            const rows = await db.query(sql, [companyId]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error(`Error fetching members for company ID ${companyId}: ${error.message}`);
        }
    },

    /**
     * Fetch all members by company name
     * @param name
     * @returns {Promise<*>}
     */
    getMemberByName: async (name) => {
        try {
            const sql = `SELECT * FROM member WHERE Name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error(`Error fetching member with name ${name}: ${error.message}`);
        }
    },

    /**
     * Fetch all members by member ID
     * @param memberId
     * @returns {Promise<*>}
     */
    getMemberDetails: async (memberId) => {
        try {
            const sql = `SELECT * FROM member WHERE MemberID = ?`;
            const rows = await db.query(sql, [memberId]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error(`Error fetching member with ID ${memberId}: ${error.message}`);
        }
    },

    /**
     * Check if the password is valid for a member
     * @param memberId
     * @param password
     * @returns {Promise<void|*|{message: string}|boolean>}
     */
    isPasswordValid: async (memberId, password) => {
        try {
            if(await this.MemberExists(memberId)){
                return {
                    message: 'Member does not exist'
                }
            }
            const sql = `SELECT Password FROM member WHERE MemberID = ?`;
            const rows = await db.query(sql, [memberId]);
            if (rows.length === 0) {
                return false;
            }
            const hashedPassword = rows[0].Password;
            return await Utils.comparePassword(password, hashedPassword);
        } catch (error) {
            throw new Error(`Error validating password for member with ID ${memberId}: ${error.message}`);
        }
    },

    /**
     * Create a new member
     * @param member
     * @returns {Promise<{affectedRows: *, message: string}|{message: string}>}
     */
    createMember: async (member) => {
        try{

            if (!(await CompanyRepository.companyExists(member.CompanyID))) {
                return {
                    message: 'Company does not exist'
                }
            }

            if (await this.MemberExistsbyName(member.Name, member.CompanyID)) {
                return {
                    message: 'Member already exists'
                }
            }

            const sql = `INSERT INTO member (Name, Email, Password, Position, CompanyID) 
                         VALUES (?, ?, ?, ?, ?)`;
            const { affectedRows } = await db.query(sql, [
                member.Name,
                member.Email,
                member.Password,
                member.Position,
                member.CompanyID
            ]);
            console.log(affectedRows);
            return {
                affectedRows: affectedRows,
                message: 'Member created successfully'
            };
        } catch (error) {
            throw new Error(`Error creating member from repo: ${error.message}`);
        }
    },

    /**
     * Update member details
     * @param memberId
     * @param updatedData
     * @returns {Promise<{affectedRows: *, message: string}>}
     */
    updateMember: async (memberId, updatedData) => {
        try {
            if ((await Utils.comparePassword(updatedData.Password, this.getMemberPassword(memberId)))) {
                updatedData.Password = null;
            }
            else {
                updatedData.Password = await Utils.hashedPassword(updatedData.Password);
            }

            const sql = `UPDATE member SET Name = ?, Email = ?, Password = ?, Position = ? WHERE MemberID = ?`;
            const { affectedRows } = await db.query(sql, [
                updatedData.Name,
                updatedData.Email,
                updatedData.Password,
                updatedData.Position,
                memberId
            ]);
            return {
                affectedRows: affectedRows,
                message: 'Member updated successfully'
            };
        } catch (error) {
            throw new Error(`Error updating member with ID ${memberId}: ${error.message}`);
        }
    },

    /**
     * Delete a member
     * @param memberId
     * @returns {Promise<{affectedRows: *, message: string}>}
     */
    deleteMember: async (memberId) => {
        try {
            const sql = `DELETE FROM member WHERE MemberID = ?`;
            const { affectedRows } = await db.query(sql, [memberId]);
            return {
                affectedRows: affectedRows,
                message: 'Member deleted successfully'
            };
        } catch (error) {
            throw new Error(`Error deleting member with ID ${memberId}: ${error.message}`);
        }
    },

    /**
     * Check if a member exists by name and company ID
     * @param name
     * @param CompanyID
     * @returns {Promise<boolean>}
     * @constructor
     */
    MemberExistsbyName: async (name, CompanyID) => {
        try {
            const sql = `SELECT * FROM member WHERE Name = ? AND CompanyID = ?`;
            const rows = await db.query(sql, [name, CompanyID]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error checking if member exists: ${error.message}`);
        }
    },

    /**
     * Check if a member exists by ID
     * @param memberId
     * @returns {Promise<boolean>}
     * @constructor
     */
    MemberExists: async (memberId) => {
        try {
            const sql = `SELECT * FROM member WHERE MemberID = ?`;
            const rows = await db.query(sql, [memberId]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error checking if member exists: ${error.message}`);
        }
    },

    /**
     * Fetch member password by member ID
     * @param memberId
     * @returns {Promise<null|void|*>}
     */
    getMemberPassword: async (memberId) => {
        try {
            const sql = `SELECT Password FROM member WHERE MemberID = ?`;
            const rows = await db.query(sql, [memberId]);
            return rows[0].Password;
        } catch (error) {
            throw new Error(`Error fetching member password: ${error.message}`);
        }
    }
}

module.exports = MemberRepository;