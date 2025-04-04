const db = require('../config/db');
const Member = require('../models/memberModel');
const CompanyRepository = require('./companyRepository');

const MemberRepository = {
    getAllMembersByCompanyId: async (companyId) => {
        try {
            const sql = `SELECT * FROM member WHERE CompanyID = ?`;
            const rows = await db.query(sql, [companyId]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error(`Error fetching members for company ID ${companyId}: ${error.message}`);
        }
    },

    getMemberByName: async (name) => {
        try {
            const sql = `SELECT * FROM member WHERE Name = ?`;
            const rows = await db.query(sql, [name]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error(`Error fetching member with name ${name}: ${error.message}`);
        }
    },

    getMemberDetails: async (memberId) => {
        try {
            const sql = `SELECT * FROM member WHERE MemberID = ?`;
            const rows = await db.query(sql, [memberId]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error(`Error fetching member with ID ${memberId}: ${error.message}`);
        }
    },

    createMember: async (member) => {
        try{

            if (!(await CompanyRepository.companyExists(member.CompanyID))) {
                return {
                    message: 'Company does not exist'
                }
            }

            if (await this.MemberExists(member.Name, member.CompanyID)) {
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

    updateMember: async (memberId, updatedData) => {
        try {
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

    MemberExists: async (name, CompanyID) => {
        try {
            const sql = `SELECT * FROM member WHERE Name = ? AND CompanyID = ?`;
            const rows = await db.query(sql, [name, CompanyID]);
            return rows.length > 0;
        } catch (error) {
            throw new Error(`Error checking if member exists: ${error.message}`);
        }
    }
}

module.exports = MemberRepository;