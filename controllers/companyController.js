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
     * Get company by name
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
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

    /**
     * Get company by ID
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
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
     * Delete company
     * @param req
     * @param res
     * @returns {Promise<*>}
     */
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

    /**
     * Render form to create a new company
     * @param req
     * @param res
     */
    renderNewForm: (req, res) => {
        res.render('companies/new');
    },

    /**
     * Render form to edit a company
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    renderEditForm: async (req, res) => {
        try {
            const company = await companyService.getCompanyById(req.params.CompanyID);
            if (!company) {
                return res.status(404).render('error', { title: 'Not Found', message: 'Company not found', errorDetail: '' });
            }
            res.render('companies/edit', { company });
        } catch (error) {
            res.status(500).render('error', { title: 'Error', message: 'Failed to load company for editing.', errorDetail: error.message });
        }
    },

    /**
     * Show a single company
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    showCompany: async (req, res) => {
        try {
            const company = await companyService.getCompanyById(req.params.CompanyID);
            if (!company) {
                return res.status(404).render('error', { title: 'Not Found', message: 'Company not found', errorDetail: '' });
            }
            res.render('companies/show', { company });
        } catch (error) {
            res.status(500).render('error', { title: 'Error', message: 'Failed to load company.', errorDetail: error.message });
        }
    },

    /**
     * Handle create company POST
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    createCompany: async (req, res) => {
        try {
            const { Name, Location, ContactInfo, Industry, Website } = req.body;
            if (!Name) {
                return res.status(400).render('companies/new', { message: { type: 'danger', text: 'Name is required.' } });
            }
            let company = new Company(Name, Location, ContactInfo, Industry, Website);
            await companyService.createCompany(company);
            res.redirect('/companies');
        } catch (error) {
            res.status(500).render('companies/new', { message: { type: 'danger', text: error.message } });
        }
    },

    /**
     * Handle update company PUT
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    updateCompany: async (req, res) => {
        try {
            const companyid = req.params.CompanyID;
            const { Name, Location, ContactInfo, Industry, Website } = req.body;
            if (!companyid) {
                return res.status(404).render('error', { title: 'Not Found', message: 'Company not found', errorDetail: '' });
            }
            await companyService.updateCompany(companyid, Name, Location, ContactInfo, Industry, Website);
            res.redirect(`/companies/${companyid}`);
        } catch (error) {
            res.status(500).render('error', { title: 'Error', message: 'Failed to update company.', errorDetail: error.message });
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
