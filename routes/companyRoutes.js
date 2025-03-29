const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');
const { validateCompany, validateCompanyId } = require('../validators/company.dto');

// Get all companies
router.get('/', CompanyController.getCompanies);

// Get company by name
router.get('/name/:name', CompanyController.getCompanybyName);

// Get company details by ID
router.get('/:CompanyID', validateCompanyId, CompanyController.getCompanyDetails);

// Create a new company
router.post('/', validateCompany, CompanyController.createCompany);

// Update a company
router.put('/:CompanyID', validateCompany, validateCompanyId, CompanyController.updateCompany);

// Delete a company
router.delete('/:CompanyID', validateCompanyId, CompanyController.deleteCompany);

module.exports = router;
