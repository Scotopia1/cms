const express = require('express');
const CompanyController = require('../controllers/companyController');
const {validateCompany} = require('../validators/company.dto');

const router = express.Router();

// Get requests
router.get('/companies', CompanyController.getCompanies);
router.get('/companies/:name', CompanyController.getCompanybyName);
router.get('/companies/:id', CompanyController.getCompanyDetails); // Combine details into one endpoint

// Post requests
router.post('/companies', validateCompany, CompanyController.createCompany);

// Put requests
router.put('/companies/:id/name', validateCompany, CompanyController.changeCompanyName);
router.put('/companies/:id/location', validateCompany, CompanyController.changeCompanyLocation);
router.put('/companies/:id/contact', validateCompany, CompanyController.changeCompanyContactInfo);
router.put('/companies/:id/industry', validateCompany, CompanyController.changeCompanyIndustry);
router.put('/companies/:id/website', validateCompany, CompanyController.editCompanyWebsite);

// Delete requests
router.delete('/companies/:id', CompanyController.deleteCompany);

module.exports = router;
