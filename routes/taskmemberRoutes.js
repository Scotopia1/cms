const express = require('express');
const router = express.Router();
const taskMemberController = require('../controllers/taskMemberController');
const {validateTaskId} = require ('../validators/task.dto');
const {validateMemberId} = require ('../validators/member.dto');

// Get all task members
router.get('/', taskMemberController.getAllTaskMembers);

// Get all members assigned to a task
router.get('/task/:TaskID', validateTaskId, taskMemberController.getMemberAssignedToTask);

// Get all tasks assigned to a member
router.get('/member/:MemberID', validateMemberId, taskMemberController.getTaskAssignedToMember);

// Get  detailed tasks assigned to a specific member
router.get('/member/:MemberID/tasks/:TaskID', validateMemberId, validateTaskId,taskMemberController.getTaskAssignedToMemberDetails);

// Assign a member to a task
router.post('/task/', taskMemberController.assignMemberToTask);

// Unassign a member from a task
router.delete('/', taskMemberController.unassignMemberFromTask);

module.exports = router;