const companyRepository = require('../repositories/companyRepository');

const CompanyService = {
    getAllCompanies: async () => {
        try {
            return await companyRepository.read();
        } catch (error) {
            throw new Error(`Error fetching companies: ${error.message}`);
        }
    },

    getCompanyById: async (id) => {
        try {
            return await companyRepository.readCompany(id);
        } catch (error) {
            throw new Error(`Error fetching company with ID ${id}: ${error.message}`);
        }
    },

    getCompanyByName: async (name) => {
        try {
            return await companyRepository.readCompanyByName(name);
        } catch (error) {
            throw new Error(`Error fetching company with name ${name}: ${error.message}`);
        }
    },

    createCompany: async (company) => {
        try {
            return await companyRepository.create(company);
        } catch (error) {
            throw new Error(`Error creating company: ${error.message}`);
        }
    },

    updateCompany: async (company) => {
        try {
            return await companyRepository.update(company);
        } catch (error) {
            throw new Error(`Error updating company: ${error.message}`);
        }
    },

    deleteCompany: async (CompanyID) => {
        try {
            return await companyRepository.delete(CompanyID);
        } catch (error) {
            throw new Error(`Error deleting company with ID ${CompanyID}: ${error.message}`);
        }
    }
}

module.exports = CompanyService;