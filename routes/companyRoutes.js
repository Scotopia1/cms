const express = require('express');
const CompanyController = require('../controllers/companyController');
const {validateCompany, validateCompanyId} = require('../validators/company.dto');


const app = express();
const router = express.Router();

const projectRoutes = require('./projectRoutes');

// Get requests
router.get('/', CompanyController.getCompanies); // Get all companies
router.get('/:name', CompanyController.getCompanybyName); // Get company by name
router.get('/:companyid', CompanyController.getCompanyDetails); // Combine details into one endpoint

// Post requests
router.post('/', validateCompany, CompanyController.createCompany); // Create a company

// Put requests
router.put('/:companyid', validateCompany, validateCompanyId,  CompanyController.updateCompany); // Update a company

// Delete requests
router.delete('/:companyid/', CompanyController.deleteCompany); // Delete a company

module.exports = router;