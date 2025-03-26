const db = require('../config/db');
const MemberModel = require('../models/memberModel');
const Util = require('../Utils/utils');
const {response} = require("express");

const memberRepository = {
    /**
     * Method to create a member
     * @returns createdMember
     * @param member
     */
    async createMember(member) {
        try {
            let sql = `INSERT INTO member
                           (MemberID, Name, Position, Email, Password, Availability, CompanyID)
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

            let hashedPassword = await Util.hashedPassword(member.Password);
            const {affectedRows} = await db.query(sql, [member.MemberID, member.Name, member.Position,
                member.Email, hashedPassword, member.Availability, member.CompanyID]);
            return {
                affectedRows
            }
        } catch (e) {
            // propagate an error
            throw new Error(e);
        }
    },

    async readMember(id) {
        let sql = `SELECT *
                   FROM member
                   WHERE MemberID = ${id}`;
        const rows = await db.query(sql);
        return MemberModel.fromRow(rows[0]);
    },

    async readMemberByName(name) {
        if (await this.memberExist(name)) {
            let sql = `SELECT *
                   FROM member
                   WHERE Name = '${name}'`;

        const rows = await db.query(sql);
        return MemberModel.fromRow(rows[0]);
        }
        console.log('Member does not exist');
        response.status(404).send('Member does not exist');
    },

    async readMembers() {
        try {
            let sql = 'SELECT * FROM member';
            const rows = await db.query(sql);
            return rows.map(MemberModel.fromRow);
        }catch (e) {
            throw new Error(e);
        }
    },

    async memberExist(name) {
        let sql = `SELECT * FROM member WHERE Name = '${name}'`;
        const rows = await db.query(sql);
        return rows.length > 0;
    },

    async deleteMember(id) {
        let sql = 'DELETE FROM member WHERE MemberID = ?';
        const [result] = await db.query(sql, [id]);
        return result;
    },

    async changeMemberName(id, name) {
        let sql = 'UPDATE member SET Name = ? WHERE MemberID = ?';
        const [result] = await db.query(sql, [name, id]);
        return result;
    },

    async changeMemberPosition(id, position) {
        let sql = 'UPDATE member SET Position = ? WHERE MemberID = ?';
        const [result] = await db.query(sql, [position, id]);
        return result;
    },

    async changeMemberEmail(id, email) {
        let sql = 'UPDATE member SET Email = ? WHERE MemberID = ?';
        const [result] = await db.query(sql, [email, id]);
        return result;
    },

    async changeMemberAvailability(id, availability) {
        let sql = 'UPDATE member SET Availability = ? WHERE MemberID = ?';
        const [result] = await db.query(sql, [availability, id]);
        return result;
    },

    async getHashedPassword(id) {
        let sql = 'SELECT Password FROM member WHERE MemberID = ?';
        const [result] = await db.query(sql, [id]);
        return result[0].Password;
    },

    async changeMemberPassword(id, password) {
        let sql = '';
        if (!(await Util.comparePassword(password, this.getHashedPassword(id)))) {
            let sql = 'UPDATE member SET Password = ? WHERE MemberID = ?';
            let hashedPassword = await Util.hashedPassword(password);
            const [result] = await db.query(sql, [hashedPassword, id]);
            return result;
        }
        console.log('The entered password is the same as the old password');
        response.status(400).send('The entered password is the same as the old password');
    },
};

module.exports = memberRepository;