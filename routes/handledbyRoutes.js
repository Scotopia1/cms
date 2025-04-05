const express = require('express');
const router = express.Router();
const handledByController = require('../controllers/handledbyController');
const {validateManagerId} = require('../validators/manager.dto');
const {validateProjectId} = require('../validators/project.dto');

// Route to get all handled by
router.get('/', handledByController.getAllHandledBy);

// Route to get all projects handled by a specific manager
router.get('/:ManagerID', validateManagerId , handledByController.getProjectsByManager);

// Route to get the manager handling a specific project
router.get('/project/:ProjectID', validateProjectId,handledByController.getMangerByProject);

// Assign a manager to a project
router.post('/project', handledByController.assignManagerToProject);

// Update the manager handling a project
router.put('/project/manager', handledByController.updateHandledBy);

// Unassign a manager from a project
router.delete('/', handledByController.unassignManagerFromProject);

module.exports = router;