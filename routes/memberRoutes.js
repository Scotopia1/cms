const express = require('express');
const {validateMember, validateMemberId} = require('../validators/member.dto');
const MemberController = require('../controllers/memberController');

const router = express.Router();

// Get requests
router.get('/', MemberController.getAllMembers); // Get all members
router.get('/:name', MemberController.getMemberById); // Get member by name
router.get('/:id', MemberController.getMemberDetails); // Combine details into one endpoint

// Post requests
router.post('/', validateMember, MemberController.createMember); // Create a member

// Put requests
router.put('/:id/name', validateMember, validateMemberId, MemberController.changeMemberName); // Change member name
router.put('/:id/position', validateMember, validateMemberId, MemberController.changeMemberPosition); // Change member position
router.put('/:id/email', validateMember, validateMemberId, MemberController.changeMemberEmail); // Change member email
router.put('/:id/phone', validateMember, validateMemberId, MemberController.changeMemberPassword); // Change member phone
router.put('/:id/availability', validateMember, validateMemberId, MemberController.EditMemberAvailability); // Change member availability

// Delete requests
router.delete('/:id', validateMemberId, MemberController.deleteMember);

module.exports = router;