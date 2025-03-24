const express = require('express');
const CompanyController = require('../controllers/companyController');
const {validateCompany} = require('../validators/company.dto');

const router = express.Router();

// Get requests
router.get('/companies', CompanyController.getCompanies); // Get all companies
router.get('/companies/:name', CompanyController.getCompanybyName); // Get company by name
router.get('/companies/:id', CompanyController.getCompanyDetails); // Combine details into one endpoint

// Post requests
router.post('/companies', validateCompany, CompanyController.createCompany); // Create a company

// Put requests
router.put('/companies/:id/name', validateCompany, CompanyController.changeCompanyName); // Change company name
router.put('/companies/:id/location', validateCompany, CompanyController.changeCompanyLocation); // Change company location
router.put('/companies/:id/contact', validateCompany, CompanyController.changeCompanyContactInfo); // Change company contact info
router.put('/companies/:id/industry', validateCompany, CompanyController.changeCompanyIndustry); // Change company industry
router.put('/companies/:id/website', validateCompany, CompanyController.editCompanyWebsite); // Change company website

// Delete requests
router.delete('/companies/:id', CompanyController.deleteCompany); // Delete a company

module.exports = router;