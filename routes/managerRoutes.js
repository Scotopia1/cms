const express = require('express');
const router = express.Router();
const ManagerController = require('../controllers/managerController');
const { validateManager, validateManagerId } = require('../validators/manager.dto');
const {validateCompanyId} = require('../validators/company.dto');

// Get all managers
router.get('/:CompanyID', validateCompanyId, ManagerController.getManagers);

// Get manager by ID
router.get('/:ManagerID', validateCompanyId, validateManagerId, ManagerController.getManagerById);

// Create a new manager
router.post('/:CompanyID', validateCompanyId, validateManager, ManagerController.createManager);

// Update a manager
router.put('/:ManagerID', validateManager, validateManagerId, ManagerController.updateManager);

// Delete a manager
router.delete('/:ManagerID', validateManagerId, ManagerController.deleteManager);

module.exports = router;