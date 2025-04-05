const express = require('express');
const router = express.Router();
const worksForController = require('../controllers/worksforController');
const {validateMemberId} = require('../validators/member.dto');
const {validateProjectId} = require('../validators/project.dto');

// Route to get all works for
router.get('/', worksForController.getAllWorksFor);

// Route to get all projects that involves a specific member
router.get('/member/:MemberID', validateMemberId, worksForController.getProjectsByMember);

// Route to get the members involved in a specific project
router.get('/project/:ProjectID', validateProjectId, worksForController.getMembersByProject);

// Route to get a specific member involved in a specific project
router.get('/project/:ProjectID/member/MemberID', validateProjectId, validateMemberId, worksForController.getMemberByProject);

// Assign a member to a project
router.post('/project', worksForController.assignMemberToProject);

// Unassign a member from a project
router.delete('/', worksForController.unassignMemberFromProject);

module.exports = router;