const CompanyRepository = require('../repositories/companyRepository');

class CompanyService {

    static async createCompany(company) {
        // Create a new company
        try {
            return CompanyRepository.createCompany(company);
        } catch (e) {
            throw new Error(e);
        }

    }

    static async getCompanies() {
        // Get all companies
        try {
            return CompanyRepository.getCompanies();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCompanybyName(name) {
        // Get company by name
        try {
            return CompanyRepository.getCompanybyName(name);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCompanyDetails(id) {
        // Get company details
        try {
            return CompanyRepository.getCompanyDetails(id);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyName(id, name) {
        // Change company name
        try {
            return CompanyRepository.changeCompanyName(id, name);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyLocation(id, location) {
        // Change company location
        try {
            return CompanyRepository.changeCompanyLocation(id, location);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyContactInfo(id, contactInfo) {
        // Change company contact info
        try {
            return CompanyRepository.changeCompanyContactInfo(id, contactInfo);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyIndustry(id, industry) {
        // Change company industry
        try {
            return CompanyRepository.changeCompanyIndustry(id, industry);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async editCompanyWebsite(id, website) {
        // Edit company website
        try {
            return CompanyRepository.editCompanyWebsite(id, website);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deleteCompany(id) {
        // Delete company
        try {
            return CompanyRepository.deleteCompany(id);
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = CompanyService;