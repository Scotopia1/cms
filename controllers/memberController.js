const MemberService = require('../services/memberService');
const Member = require("../models/memberModel");

class MemberController {

    static async getAllMembers(req, res) {
        // Get all members
        try {
            const members = await MemberService.getAllMembers();
            res.status(200).json(members);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while getting all members!', error: e.message});
        }
    }

    static async getMemberById(req, res) {
        // Get member by name
        try {
            const member = await MemberService.getMemberById(req.params.name);
            res.status(200).json(member);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Error occurred while getting member by name', error: e.message});
        }
    }

    static async getMemberDetails(req, res) {
        // Get member details
        try {
            const member = await MemberService.getMemberDetails(req.params.id);
            res.status(200).json(member);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while getting Member Details!', error: e.message});
        }
    }

    static async createMember(req, res) {
        //create a new member
        try {
            const {Name, Position, Email, Phone, Availability} = req.body;

            let member = new Member(Name, Position, Email, Phone, Availability);
            const service = await MemberService.createMember(member);
            res.status(200).json(member);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while creating the member!', error: e.message});
        }
    }

    static async changeMemberName(req, res) {
        // Change member name
        try {
            const id = req.params;
            const {Name} = req.body;
            if (!Name) {
                return res.status(400).json({message: 'Name is required!'});
            }

            const result = await MemberService.changeMemberName(id, Name);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while changing the member name!', error: e.message});
        }
    }

    static async changeMemberPosition(req, res) {
        // Change member position
        try {
            const id = req.params;
            const {Position} = req.body;
            if (!Position) {
                return res.status(400).json({message: 'Position is required!'});
            }
        } catch (e) {
            res.status(500).json({message: 'Error occurred while changing the member position!', error: e.message});
        }
    }
}