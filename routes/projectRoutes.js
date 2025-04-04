const express = require('express');
const ProjectController = require('../controllers/projectController');
const {validateProject, validateProjectId} = require('../validators/project.dto');
const {validateCompanyId} = require('../validators/company.dto');

const router = express.Router();

// Get requests
router.get('/:CompanyID', validateCompanyId,ProjectController.getProjectsbyCompanyId); // Get all projects
router.get('/:CompanyID/:name', validateCompanyId,ProjectController.getProjectByName); // Get project by name
router.get('/:ProjectID', validateProjectId,ProjectController.getProjectDetails); // Combine details into one endpoint

// Post requests
router.post('/:CompanyID/', validateCompanyId, validateProject, ProjectController.createProject); // Create a project

// Put requests
router.put('/:ProjectID', validateProjectId, ProjectController.updateProject); // Update a project

// Delete requests
router.delete('/:ProjectID', validateProjectId,ProjectController.deleteProject); // Delete a project

module.exports = router;