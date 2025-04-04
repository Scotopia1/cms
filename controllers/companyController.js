const companyService = require('../services/companyService');
const Company = require('../models/companyModel');

const CompanyController = {
    getCompanies: async (req, res) => {
        try {
            const companies = await companyService.getAllCompanies();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCompanybyName: async (req, res) => {
        try {
            const company = await companyService.getCompanyByName(req.params.name);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getCompanyDetails: async (req, res) => {
        try {
            const company = await companyService.getCompanyById(req.params.CompanyID);
            if (!company) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    createCompany: async (req, res) => {
        try {
            const { Name, Location, ContactInfo, Industry, Website } = req.body;
            if (!Name) {
                return res.status(400).json({ message: 'Name is required' });
            }
            let company = new Company(Name, Location, ContactInfo, Industry, Website);
            const newCompany = await companyService.createCompany(company);
            res.status(201).json(newCompany);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateCompany: async (req, res) => {
        try {
            const companyid = req.params.CompanyID;
            const {Name, Location, ContactInfo, industry, Website}  = req.body;
            if (!companyid) {
                return res.status(404).json({ message: 'Company not found' });
            }
            const company = await companyService.updateCompany(Name, Location, ContactInfo, industry, Website);
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteCompany: async (req, res) => {
        try {
            const deletedCompany = await companyService.deleteCompany(req.params.CompanyID);
            if (!deletedCompany) {
                return res.status(404).json({ message: 'Company not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}

module.exports = CompanyController;