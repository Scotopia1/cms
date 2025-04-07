const db = require('../config/db');
const Project = require('../models/projectModel');
const Member = require('../models/memberModel');
const ProjectRepository = require('./projectRepository');
const MemberRepository = require('./memberRepository');

const WorksforRepository = {

    /**
     * Get all works for data
     * @returns {Promise<*>}
     */
    getAllWorksFor: async () => {
        try {
            const sql = 'SELECT * FROM works_for';
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            throw new Error('Error fetching works for data');
        }
    },

    /**
     * Get all projects assigned to a member
     * @param memberId
     * @returns {Promise<*|{message: string}>}
     */
    getProjectsByMember: async (memberId) => {
        try {
            // Check if the member exists
            if (!await MemberRepository.memberExists(memberId)) {
                return { message: 'Member not found' };
            }

            const sql = 'SELECT * FROM project WHERE ProjectID IN (SELECT ProjectID FROM works_for WHERE MemberID = ?)';
            const [rows] = await db.query(sql, [memberId]);
            return rows.map(Project.fromRow);
        } catch (error) {
            throw new Error('Error fetching projects by member');
        }
    },

    /**
     * Get all members assigned to a project
     * @param projectId
     * @returns {Promise<*|{message: string}>}
     */
    getMembersByProject: async (projectId) => {
        try {
            // Check if the project exists
            if (!await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            const sql = 'SELECT * FROM member WHERE MemberID IN (SELECT MemberID FROM works_for WHERE ProjectID = ?)';
            const [rows] = await db.query(sql, [projectId]);
            return rows.map(Member.fromRow);
        } catch (error) {
            throw new Error('Error fetching members by project');
        }
    },

    /**
     * Get a member by project
     * @param projectId
     * @param memberId
     * @returns {Promise<*|{message: string}>}
     */
    getMemberByProject: async (projectId, memberId) => {
        try {
            // Check if the project exists
            if (!await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            // Check if the member exists
            if (!await MemberRepository.memberExists(memberId)) {
                return { message: 'Member not found' };
            }

            const sql = 'SELECT * FROM works_for WHERE ProjectID = ? AND MemberID = ?';
            const [rows] = await db.query(sql, [projectId, memberId]);

            if (rows.length === 0) {
                return { message: 'No assignment found' };
            }

            return rows.map(row => ({ ...row, ...Project.fromRow(row), ...Member.fromRow(row) }));
        } catch (error) {
            throw new Error('Error fetching member by project');
        }
    },

    /**
     * Assign a member to a project
     * @param memberId
     * @param projectId
     * @returns {Promise<{message: string}>}
     */
    assignMemberToProject: async (memberId, projectId) => {
        try {
            // Check if the member exists
            if (!await MemberRepository.memberExists(memberId)) {
                return { message: 'Member not found' };
            }

            // Check if the project exists
            if (!await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            // Check if the member is already assigned to the project
            if (await WorksforRepository.AlreadyWorksFor(memberId, projectId)) {
                return { message: 'Member already assigned to this project' };
            }

            const sql = 'INSERT INTO works_for (MemberID, ProjectID) VALUES (?, ?)';
            await db.query(sql, [memberId, projectId]);
            return { message: 'Member assigned to project successfully' };
        } catch (error) {
            throw new Error('Error assigning member to project');
        }
    },

    /**
     * Unassign a member from a project
     * @param memberId
     * @param projectId
     * @returns {Promise<{message: string}>}
     */
    unassignMemberFromProject: async (memberId, projectId) => {
        try {
            // Check if the member exists
            if (!await MemberRepository.memberExists(memberId)) {
                return { message: 'Member not found' };
            }

            // Check if the project exists
            if (!await ProjectRepository.projectExists(projectId)) {
                return { message: 'Project not found' };
            }

            // Check if the member is already assigned to the project
            if (!await WorksforRepository.AlreadyWorksFor(memberId, projectId)) {
                return { message: 'Member is not assigned to this project' };
            }

            const sql = 'DELETE FROM works_for WHERE MemberID = ? AND ProjectID = ?';
            await db.query(sql, [memberId, projectId]);
            return { message: 'Member unassigned from project successfully' };
        } catch (error) {
            throw new Error('Error unassigning member from project');
        }
    },

    /**
     * Check if a member already works for a project
     * @param memberId
     * @param projectId
     * @returns {Promise<boolean>}
     * @constructor
     */
    AlreadyWorksFor: async (memberId, projectId) => {
        try {
            const sql = 'SELECT * FROM works_for WHERE MemberID = ? AND ProjectID = ?';
            const [rows] = await db.query(sql, [memberId, projectId]);
            return rows.length > 0;
        } catch (error) {
            throw new Error('Error checking if member already works for project');
        }
    }
}

module.exports = WorksforRepository;