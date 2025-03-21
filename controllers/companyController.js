const CompanyService = require('../services/companyService');
const Company = require("../models/companyModel");

class CompanyController {

    static async getCompanies(req, res) {
        // Get all companies
        try {
            const companies = await CompanyService.getCompanies();
            res.status(200).json(companies);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while getting all companies!', error: e.message});
        }
    }

    static async getCompanybyName(req, res) {
        // Get company by name
        try {
            const company = await CompanyService.getCompanybyName(req.params.name);
            res.status(200).json(company);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Error occurred while getting company by name', error: e.message});
        }
    }

    static async getCompanyDetails(req, res) {
        // Get company details
        try {
            const company = await CompanyService.getCompanyDetails(req.params.id);
            res.status(200).json(company);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while getting Company Details!', error: e.message});
        }
    }

    static async createCompany(req, res) {
        //create a new company
        try {
            const {Name, Location, ContactInfo, Industry, Website} = req.body;

            let company = new Company(Name, Location, ContactInfo, Industry, Website);
            const service = await CompanyService.createCompany(company);
            res.status(200).json(company);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while creating the company!', error: e.message});
        }
    }

    static async changeCompanyName(req, res) {
        // Change company name
        try {
            const id = req.params;
            const {Name} = req.body;
            if (!Name) {
                return res.status(400).json({message: 'Name is required!'});
            }

            const result = await CompanyService.changeCompanyName(id, Name);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while changing company name!', error: e.message});
        }
    }

    static async changeCompanyLocation(req, res) {
        // Change company location
        try {
            const id = req.params;
            const {Location} = req.body;
            if (!Location) {
                return res.status(400).json({message: 'Location is required!'});
            }

            const result = await CompanyService.changeCompanyLocation(id, Location);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while changing company location!', error: e.message});
        }
    }

    static async changeCompanyContactInfo(req, res) {
        // Change company contact info
        try {
            const id = req.params;
            const {ContactInfo} = req.body;
            if (!ContactInfo) {
                return res.status(400).json({message: 'Contact Info is required!'});
            }

            const result = await CompanyService.changeCompanyContactInfo(id, ContactInfo);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while changing company contact info!', error: e.message});
        }
    }

    static async changeCompanyIndustry(req, res) {
        // Change company industry
        try {
            const id = req.params;
            const {Industry} = req.body;
            if (!Industry) {
                return res.status(400).json({message: 'Industry is required!'});
            }

            const result = await CompanyService.changeCompanyIndustry(id, Industry);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while changing company industry!', error: e.message});
        }
    }

    static async editCompanyWebsite(req, res) {
        // Edit company website
        try {
            const id = req.params;
            const {Website} = req.body;
            if (!Website) {
                return res.status(400).json({message: 'Website is required!'});
            }

            const result = await CompanyService.editCompanyWebsite(id, Website);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while editing company website!', error: e.message});
        }
    }

    static async deleteCompany(req, res) {
        // Delete company
        try {
            const id = req.params;
            const result = await CompanyService.deleteCompany(id);
            res.status(200).json(result);
        } catch (e) {
            res.status(500).json({message: 'Error occurred while deleting company!', error: e.message});
        }
    }
}

module.exports = CompanyController;