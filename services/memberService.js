const MemberRepository = require('../repositories/memberRepository');

const MemberService = {
    async createMember(member) {
        // Create a new member
        try {
            return MemberRepository.createMember(member);
        } catch (e) {
            throw new Error(e);
        }
    },

    async getAllMembers() {
        // Get all members
        try {
            return MemberRepository.readMembers();
        } catch (e) {
            throw new Error(e);
        }
    },

    async getMemberById(id) {
        // Get member by ID
        try {
            return MemberRepository.readMember(id);
        } catch (e) {
            throw new Error(e);
        }
    },

    async changeMemberName(id, name) {
        // Change member name
        try {
            return MemberRepository.changeMemberName(id, name);
        } catch (e) {
            throw new Error(e);
        }
    },

    async changeMemberPosition(id, position) {
        // Change member position
        try {
            return MemberRepository.changeMemberPosition(id, position);
        } catch (e) {
            throw new Error(e);
        }
    },

    async changeMemberEmail(id, email) {
        // Change member email
        try {
            return MemberRepository.changeMemberEmail(id, email);
        } catch (e) {
            throw new Error(e);
        }
    },

    async changeMemberPassword(id, password) {
        // Change member phone
        try {
            return MemberRepository.changeMemberPassword(id, password);
        } catch (e) {
            throw new Error(e);
        }
    },

    async changeMemberAvailability(id, availability) {
        // Change member availability
        try {
            return MemberRepository.changeMemberAvailability(id, availability);
        } catch (e) {
            throw new Error(e);
        }
    },

    async deleteMember(id) {
        // Delete member
        try {
            return MemberRepository.deleteMember(id);
        } catch (e) {
            throw new Error(e);
        }
    }
};

module.exports = MemberService;