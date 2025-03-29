const express = require('express');
const ProjectController = require('../controllers/projectController');
const {validateProject, validateProjectId} = require('../validators/project.dto');

const router = express.Router();

// Get requests
router.get('/:id', ProjectController.getProjectsbyCompanyId); // Get all projects
router.get('/:name', ProjectController.getProjectByName); // Get project by name
router.get('/:id', ProjectController.getProjectDetails); // Combine details into one endpoint

// Post requests
router.post('/', validateProject, ProjectController.createProject); // Create a project

// Put requests
router.put('/:id', validateProjectId, ProjectController.updateProject); // Update a project

// Delete requests
router.delete('/:id', ProjectController.deleteProject); // Delete a project

module.exports = router;