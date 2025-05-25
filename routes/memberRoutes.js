const express = require('express');
const MemberController = require('../controllers/memberController');
const {validateMember, validateMemberId, validateMemberCredentials} = require('../validators/member.dto');
const {validateCompanyId} = require('../validators/company.dto');

const router = express.Router();

// Get requests
router.get('/:CompanyID', MemberController.getAllMembersByCompanyId);
router.get('/name/:name', MemberController.getMemberbyName);
router.get('/details/:MemberID', MemberController.getMemberDetails);

// Post requests
router.post('/password', validateMemberCredentials, MemberController.isPasswordValid);
router.post('/:CompanyID' , validateMember, MemberController.createMember);

// Put requests
router.put('/:MemberID', validateMember, validateMemberId, MemberController.updateMember); // Update a member

// Delete requests
router.delete('/:MemberID', validateMemberId, MemberController.deleteMember);

module.exports = router;