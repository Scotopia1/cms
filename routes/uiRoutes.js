const express = require('express');
const router = express.Router();
const uiController = require('../controllers/uiController');

router.get('/login', uiController.getLoginPage);
router.get('/signup', uiController.getSignupPage);
router.get('/logout', uiController.getLogout);
router.get('/dashboard', uiController.getDashboard);
router.get('/calendar', uiController.getCalendar);
router.get('/project', uiController.getProject);
router.get('/task', uiController.getTask);
router.get('/settings', uiController.getSettings);
router.get('/report', uiController.getReport);
router.get('/member', uiController.getMember);
router.get('/company', uiController.getCompany);
router.get('/404', uiController.get404);

module.exports = router;
