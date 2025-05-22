const uiController = {
    getLoginPage: (req, res) => {
        res.render('LoginView', { title: 'Login' });
    },
    getSignupPage: (req, res) => {
        res.render('SignupView', { title: 'Sign Up' });
    },
    getLogout: (req, res) => {
        req.logout((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    },
    getDashboard: (req, res) => {
        res.render('DashboardView', { title: 'Dashboard' });
    },
    getCalendar: (req, res) => {
        res.render('CalendarView', { title: 'Calendar' });
    },
    getProject: (req, res) => {
        res.render('ProjectView', { title: 'Project' });
    },
    getTask: (req, res) => {
        res.render('TaskView', { title: 'Task' });
    },
    getSettings: (req, res) => {
        res.render('SettingsView', { title: 'User' });
    },
    getReport: (req, res) => {
        res.render('ReportView', { title: 'Report' });
    },
    getMember: (req, res) => {
        res.render('MemberView', { title: 'Member' });
    },
    getCompany: (req, res) => {
        res.render('CompanyView', { title: 'Company' });
    },
    get404: (req, res) => {
        res.status(404).render('404', { title: '404 Not Found' });
    }
}


module.exports = uiController;