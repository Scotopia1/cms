const express = require('express');
const {validateMember, validateMemberId} = require('../validators/member.dto');
const MemberController = require('../controllers/memberController');

const router = express.Router();

// Get requests
router.get('/:companyid', MemberController.getAllMembers); // Get all members
router.get('/:name', MemberController.changeMemberName); // Get member by name
router.get('/:memberid', MemberController.getMemberDetails); // Combine details into one endpoint

// Post requests
router.post('/', validateMember, MemberController.createMember); // Create a member

// Put requests
router.put('/:memberid', validateMember, validateMemberId, MemberController.updateMember); // Update a member

// Delete requests
router.delete('/:id', validateMemberId, MemberController.deleteMember);

module.exports = router;