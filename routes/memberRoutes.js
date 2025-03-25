const express = require('express');
const MemberController = require('../controllers/memberController');
const {validateMember} = require('../validators/member.dto');

const router = express.Router();

// // Get requests
// router.get('/members', MemberController.getAllMembers); // Get all members
// router.get('/members/:name', MemberController.getMemberById); // Get member by name
// router.get('/members/:id', MemberController.getMemberDetails); // Combine details into one endpoint
//
// // Post requests
// router.post('/members', validateMember, MemberController.createMember); // Create a member
//
// // Put requests
// router.put('/members/:id/name', validateMember, MemberController.changeMemberName); // Change member name
// router.put('/members/:id/position', validateMember, MemberController.changeMemberPosition); // Change member position
// router.put('/members/:id/email', validateMember, MemberController.changeMemberEmail); // Change member email
// router.put('/members/:id/phone', validateMember, MemberController.changeMemberPassword); // Change member phone
// router.put('/members/:id/availability', validateMember, MemberController.EditMemberAvailability); // Change member availability
//
// // Delete requests
// router.delete('/members/:id', MemberController.deleteMember); // Delete a member

module.exports = router;