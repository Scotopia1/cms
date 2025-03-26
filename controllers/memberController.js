const MemberService = require('../services/memberService');
const MemberModel = require("../models/memberModel");

const MemberController = {
    async createMember(req, res) {
        try {
            const member = new MemberModel(req.body);
            const newMember = await MemberService.createMember(member);
            res.status(201).json(newMember);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getAllMembers(req, res) {
        try {
            const members = await MemberService.getAllMembers();
            res.status(200).json(members);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getMemberById(req, res) {
        try {
            const member = await MemberService.getMemberById(req.params.id);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getMemberDetails(req, res) {
        try {
            const member = await MemberService.getMemberDetails(req.params.id);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changeMemberName(req, res) {
        try {
            const member = await MemberService.changeMemberName(req.params.id, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changeMemberPosition(req, res) {
        try {
            const member = await MemberService.changeMemberPosition(req.params.id, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changeMemberEmail(req, res) {
        try {
            const member = await MemberService.changeMemberEmail(req.params.id, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async changeMemberPassword(req, res) {
        try {
            const member = await MemberService.changeMemberPassword(req.params.id, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async EditMemberAvailability(req, res) {
        try {
            const member = await MemberService.EditMemberAvailability(req.params.id, req.body);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async deleteMember(req, res) {
        try {
            const member = await MemberService.deleteMember(req.params.id);
            res.status(200).json(member);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
};
module.exports = MemberController;