const express = require('express');
const CompanyController = require('../controllers/companyController');
const {validateCompany, validateCompanyId} = require('../validators/company.dto');

const router = express.Router();

// Get requests
router.get('/', CompanyController.getCompanies); // Get all companies
router.get('/:name', CompanyController.getCompanybyName); // Get company by name
router.get('/:id', CompanyController.getCompanyDetails); // Combine details into one endpoint

// Post requests
router.post('/', validateCompany, CompanyController.createCompany); // Create a company

// Put requests
router.put('/name', validateCompany, validateCompanyId,  CompanyController.changeCompanyName); // Change company name
router.put('/location', validateCompany, validateCompanyId, CompanyController.changeCompanyLocation); // Change company location
router.put('/:id/contact', validateCompany, validateCompanyId, CompanyController.changeCompanyContactInfo); // Change company contact info
router.put('/:id/industry', validateCompany, validateCompanyId, CompanyController.changeCompanyIndustry); // Change company industry
router.put('/:id/website', validateCompany, validateCompanyId, CompanyController.editCompanyWebsite); // Change company website

// Delete requests
router.delete('/:id', CompanyController.deleteCompany); // Delete a company

module.exports = router;