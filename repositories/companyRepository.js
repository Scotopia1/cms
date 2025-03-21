const Company = require("../models/company");

class CompanyRepository {

    static async createCompany(company) {

        try {
            return await Company.create({
                CompanyID: company.CompanyID,
                Name: company.Name,
                Location: company.Location,
                ContactInfo: company.ContactInfo,
                Industry: company.Industry,
                Website: company.Website
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCompanies() {
        try {
            return await Company.findAll();
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCompanybyName(name) {
        try {
            return await Company.findOne({where: {Name: name}});
        } catch (e) {
            throw new Error(e);
        }
    }

    static async getCompanyDetails(id) {
        try {
            return await Company.findByPk(id);
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyName(id, name) {
        try {
            return await Company.update({Name: name}, {where: {CompanyID: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyLocation(id, location) {
        try {
            return await Company.update({Location: location}, {where: {CompanyID: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyContactInfo(id, contactInfo) {
        try {
            return await Company.update({ContactInfo: contactInfo}, {where: {CompanyID: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    static async changeCompanyIndustry(id, industry) {
        try {
            return await Company.update({Industry: industry}, {where: {CompanyID: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    static async editCompanyWebsite(id, website) {
        try {
            return await Company.update({Website: website}, {where: {CompanyID: id}});
        } catch (e) {
            throw new Error(e);
        }
    }

    static async deleteCompany(id) {
        try {
            return await Company.destroy({where: {CompanyID: id}});
        } catch (e) {
            throw new Error(e);
        }
    }
}

module.exports = CompanyRepository;