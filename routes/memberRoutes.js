// const express = require('express');
// const {validateMember, validateMemberId} = require('../validators/member.dto');
// const MemberController = require('../controllers/memberController');
//
// const router = express.Router();
//
// // Get requests
// router.get('/:companyid', MemberController.getAllMembers); // Get all members
// router.get('/name/:name', MemberController.changeMemberName); // Get member by name
// router.get('/details/:MemberID', MemberController.getMemberDetails); // Combine details into one endpoint
//
// // Post requests
// router.post('/', validateMember, MemberController.createMember); // Create a member
//
// // Put requests
// router.put('/:MemberID', validateMember, validateMemberId, MemberController.updateMember); // Update a member
//
// // Delete requests
// router.delete('/:MemberID', validateMemberId, MemberController.deleteMember);
//
// module.exports = router;