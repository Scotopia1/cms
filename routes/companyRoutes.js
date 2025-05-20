const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/companyController');
const { validateCompany, validateCompanyId } = require('../validators/company.dto');

// List all companies (GUI)
router.get('/', CompanyController.getCompanies);

// Render form to create a new company
router.get('/new', CompanyController.renderNewForm);

// Show a single company (GUI)
router.get('/:CompanyID', CompanyController.showCompany);

// Render form to edit a company
router.get('/edit/:CompanyID', CompanyController.renderEditForm);

// Create a new company (form POST)
router.post('/', CompanyController.createCompany);

// Update a company (form PUT)
router.put('/edit/:CompanyID', CompanyController.updateCompany);

// Delete a company (form DELETE)
router.delete('/delete/:CompanyID', CompanyController.deleteCompany);

module.exports = router;