const Member = require('../models/memberModel');
const MemberService = require('../services/memberService');

const MemberController = {
    getAllMembersByCompanyId: async (req, res) => {
        try {
            const companyId = req.params.CompanyID;
            const members = await MemberService.getAllMembersByCompanyId(companyId);
            if (!members) {
                return res.status(404).json({ message: 'No members found for this company' });
            }
            res.status(200).json(members);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMemberbyName: async (req, res) => {
        try {
            const memberName = req.params.name;
            const member = await MemberService.getMemberByName(memberName);
            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getMemberDetails: async (req, res) => {
        try {
            const memberId = req.params.MemberID;
            const member = await MemberService.getMemberDetails(memberId);
            if (!member) {
                return res.status(404).json({ message: 'Member not found' });
            }
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createMember: async (req, res) => {
        try {
            const CompanyID = req.params.CompanyID;
            const { Name, Email, Password, Position} = req.body;
            if (!Name || !Email || !Password || !Position) {
                return res.status(400).json({ message: 'All fields are required' });
            }
            let member = new Member(Name, Email, Password, Position, CompanyID);
            const newMember = await MemberService.createMember(member);
            res.status(201).json(newMember);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateMember: async (req, res) => {
        try {
            const memberId = req.params.MemberID;
            const {Name, Email, PhoneNumber} = req.body;
            if (!memberId) {
                return res.status(404).json({message: 'Member not found'});
            }
            const member = await MemberService.updateMember(memberId, Name, Email, PhoneNumber);
            res.status(200).json(member);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },

    deleteMember: async (req, res) => {
        try {
            const memberId = req.params.MemberID;
            if (!memberId) {
                return res.status(404).json({ message: 'Member not found' });
            }
            await MemberService.deleteMember(memberId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = MemberController;