const db = require('../config/db');
const Task = require('../models/taskModel');
const Member = require('../models/memberModel');
const TaskRepository = require('./taskRepository');
const MemberRepository = require('./memberRepository');
const WorksForRepository = require('./worksforRepository');

const TaskMemberRepository = {
    getAllTaskMembers: async () => {
        try {
            let sql = `SELECT *
                       FROM task_member`;
            const [rows] = await db.query(sql);
            return rows;
        } catch (error) {
            console.error('Error fetching all task members:', error);
            throw error;
        }
    },

    getMemberAssignedToTask: async (TaskID) => {
        try {
            let sql = `SELECT *
                       FROM task_member
                       WHERE TaskID = ?`;
            const [rows] = await db.query(sql, [TaskID]);
            return rows(Member.fromRow);
        } catch (error) {
            console.error('Error fetching members assigned to task:', error);
            throw error;
        }
    },

    getTaskAssignedToMember: async (MemberID) => {
        try {
            let sql = `SELECT *
                       FROM task_member
                       WHERE MemberID = ?`;
            const [rows] = await db.query(sql, [MemberID]);
            return rows(Task.fromRow);
        } catch (error) {
            console.error('Error fetching tasks assigned to member:', error);
            throw error;
        }
    },

    getTaskAssignedToMemberDetails: async (MemberID, TaskID) => {
        try {
            let sql = `SELECT *
                       FROM task
                                INNER JOIN task_member ON task.TaskID = task_member.TaskID
                       WHERE task_member.MemberID = ?
                         AND task_member.TaskID = ?`;
            const [rows] = await db.query(sql, [MemberID, TaskID]);
            return Task.fromRow(rows[0]);
        } catch (error) {
            console.error('Error fetching task details assigned to member:', error);
            throw error;
        }
    },

    assignMemberToTask: async (TaskID, MemberID) => {
        try {
            const projectID = await this.getProjectIDbyTask(TaskID);

            // Check if the member is already assigned to the project
            if (!await WorksForRepository.AlreadyWorksFor(projectID, MemberID)) {
                return {
                    message: 'Member is not assigned to the project'
                }
            }

            // Check if the task and member exist
            if (!await TaskRepository.isTask(TaskID)) {
                return {
                    message: 'Task does not exist'
                }
            }

            // Check if the member exists
            if (!await MemberRepository.MemberExists(MemberID)) {
                return {
                    message: 'Member does not exist'
                }
            }

            // Check if the member is already assigned to the task
            if (await this.IsAlreadyAssigned(TaskID, MemberID)) {
                return {
                    message: 'Member is already assigned to the task'
                }
            }

            let sql = `INSERT INTO task_member (TaskID, MemberID)
                       VALUES (?, ?)`;
            const affectedRows = await db.query(sql, [TaskID, MemberID]);
            return {
                AffectedRows: affectedRows,
                message: 'Member assigned to task successfully'
            };
        } catch (error) {
            console.error('Error assigning member to task:', error);
            throw error;
        }
    },

    unassignMemberFromTask: async (TaskID, MemberID) => {
        try {
            // Check if the task and member exist
            if (!await TaskRepository.isTask(TaskID)) {
                return {
                    message: 'Task does not exist'
                }
            }

            // Check if the member exists
            if (!await MemberRepository.MemberExists(MemberID)) {
                return {
                    message: 'Member does not exist'
                }
            }

            // Check if the member is assigned to the task
            if (!await this.IsAlreadyAssigned(TaskID, MemberID)) {
                return {
                    message: 'Member is not assigned to the task'
                }
            }
            let sql = `DELETE
                       FROM task_member
                       WHERE TaskID = ?
                         AND MemberID = ?`;
            const affectedRows = await db.query(sql, [TaskID, MemberID]);
            return {
                AffectedRows: affectedRows,
                message: 'Member unassigned from task successfully'
            };
        } catch (error) {
            console.error('Error unassigning member from task:', error);
            throw error;
        }
    },

    IsAlreadyAssigned: async (TaskID, MemberID) => {
        try {
            let sql = `SELECT *
                       FROM task_member
                       WHERE TaskID = ?
                         AND MemberID = ?`;
            const [rows] = await db.query(sql, [TaskID, MemberID]);
            return rows.length > 0;
        } catch (error) {
            console.error('Error checking if member is already assigned to task:', error);
            throw error;
        }
    },

    getProjectIDbyTask: async (TaskID) => {
        try {
            let sql = `SELECT ProjectID
                       FROM task
                       WHERE TaskID = ?`;
            const [rows] = await db.query(sql, [TaskID]);
            return rows[0].ProjectID;
        } catch (error) {
            console.error('Error fetching project ID by task:', error);
            throw error;
        }
    }

}

module.exports = TaskMemberRepository;