const express = require('express');
const MemberController = require('../controllers/memberController');
const {validateMember, validateMemberId} = require('../validators/member.dto');
const {validateCompanyId} = require('../validators/company.dto');

const router = express.Router();

// Get requests
router.get('/:CompanyID', validateCompanyId, MemberController.getAllMembersByCompanyId); // Get all members
router.get('/name/:CompanyID/:name', validateCompanyId, validateMember,MemberController.getMemberbyName); // Get member by name
router.get('/details/:MemberID', MemberController.getMemberDetails); // Combine details into one endpoint

// Post requests
router.post('/:CompanyID/',validateCompanyId ,validateMember, MemberController.createMember); // Create a member

// Put requests
router.put('/:MemberID', validateMember, validateMemberId, MemberController.updateMember); // Update a member

// Delete requests
router.delete('/:MemberID', validateMemberId, MemberController.deleteMember);

module.exports = router;