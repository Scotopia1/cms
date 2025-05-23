const companyService = require('../services/companyService');
const Company = require('../models/companyModel');

const CompanyController = {

    /**
     * Get all companies
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    getCompanies: async (req, res) => {
        try {
            const companies = await companyService.getAllCompanies();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Create a new company
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
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

    /**
     * Update company details
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    updateCompany: async (req, res) => {
        try {
            const companyid = req.params.CompanyID;
            const { Name, Location, ContactInfo, Industry, Website } = req.body;
            if (!companyid) {
                return res.status(404).json({ message: 'Company not found' });
            }
            const company = await companyService.updateCompany(companyid, Name, Location, ContactInfo, Industry, Website);
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    /**
     * Set admin for a company
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
    setAdmin: async (req, res) => {
        try {
            const companyid = req.params.CompanyID;
            const { AdminID } = req.body;
            if (!companyid) {
                return res.status(404).json({ message: 'Company not found' });
            }
            const company = await companyService.setAdmin(companyid, AdminID);
            res.status(200).json(company);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    /**
     * Handle delete company
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    deleteCompany: async (req, res) => {
        try {
            const deletedCompany = await companyService.deleteCompany(req.params.CompanyID);
            if (!deletedCompany) {
                return res.status(404).render('error', { title: 'Not Found', message: 'Company not found', errorDetail: '' });
            }
            res.redirect('/companies');
        } catch (error) {
            res.status(500).render('error', { title: 'Error', message: 'Failed to delete company.', errorDetail: error.message });
        }
    },
}

module.exports = CompanyController;
