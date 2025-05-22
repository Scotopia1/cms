const MemberRepository = require('../repositories/memberRepository');

const MemberService = {
    getAllMembersByCompanyId: async (companyId) => {
        try {
            return await MemberRepository.getAllMembersByCompanyId(companyId);
        } catch (error) {
            throw new Error('Error fetching members by company ID: ' + error.message);
        }
    },

    getMemberByName: async (name) => {
        try {
            return await MemberRepository.getMemberByName(name);
        } catch (error) {
            throw new Error('Error fetching member by name: ' + error.message);
        }
    },

    getMemberDetails: async (memberId) => {
        try {
            return await MemberRepository.getMemberDetails(memberId);
        } catch (error) {
            throw new Error('Error fetching member details: ' + error.message);
        }
    },

    isPasswordValid: async (Email, password) => {
        try {
            return await MemberRepository.isPasswordValid(Email, password);
        } catch (error) {
            throw new Error('Error validating member password: ' + error.message);
        }
    },

    createMember: async (member) => {
        try {
            return await MemberRepository.createMember(member);
        } catch (error) {
            throw new Error('Error creating member: ' + error.message);
        }
    },

    updateMember: async (memberId, updatedData) => {
        try {
            return await MemberRepository.updateMember(memberId, updatedData);
        } catch (error) {
            throw new Error('Error updating member: ' + error.message);
        }
    },

    deleteMember: async (memberId) => {
        try {
            return await MemberRepository.deleteMember(memberId);
        } catch (error) {
            throw new Error('Error deleting member: ' + error.message);
        }
    }
}

module.exports = MemberService;