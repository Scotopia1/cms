const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const memberRoutes = require('./routes/memberRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', 'layout');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.use('/auth', authRoutes);

app.get('/dashboard', (req, res) => {
    async function getDashboardData(userId, userRole) {
        const placeholderData = {
            totalTasks: 24,
            unfinishedTasks: 12,
            upcomingDeadlineCount: 5,
            activeProjectsCount: 3,
            recentTasks: [
                { id: 1, title: 'Update landing page', due_date: '2025-01-19', status: 'In Progress' },
                { id: 2, title: 'User research', due_date: '2025-01-22', status: 'Pending' },
                { id: 3, title: 'Develop API endpoints', due_date: '2025-01-25', status: 'To Do' },
            ]
        };

        if (userRole === 'manager') {
            placeholderData.teamMemberCount = 8;
            placeholderData.adminCount = 2;
            placeholderData.teamMembers = [
                { id: 1, name: 'Sarah Johnson', role: 'Project Manager' },
                { id: 2, name: 'Mike Williams', role: 'Lead Developer' },
                { id: 3, name: 'Alex Chen', role: 'UX Designer' },
                { id: 4, name: 'Emily Davis', role: 'QA Tester' },
                { id: 5, name: 'David Brown', role: 'Developer' },
            ];
        }
        return placeholderData;
    }

    app.get('/dashboard', async (req, res) => {
        try {
            const user = {
                name: 'Johnny Jneid',
                email: 'johnny@example.com',
                role: 'manager'
            };

            if (!user) {
                return res.redirect('/auth/login');
            }

            const dashboardData = await getDashboardData(user.id, user.role);

            res.render('index', {
                title: 'Dashboard',
                user: user,
                ...dashboardData,
                page: 'dashboard'
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).send('Error loading dashboard');
        }
    });
});

app.use('/companies', companyRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/members', memberRoutes);
app.use('/managers', managerRoutes);

app.use((req, res, next) => {
    res.status(404).render('error', {
        title: 'Page Not Found',
        message: 'Sorry, the page you are looking for does not exist.',
        layout: 'layout'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).render('error', {
        title: 'Server Error',
        message: err.message || 'Something went wrong on our end.',
        errorDetail: process.env.NODE_ENV === 'development' ? err.stack : '',
        layout: 'layout'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Login page should now be at http://localhost:${PORT}/ (redirects to /login)`);
    console.log(`Signup page at http://localhost:${PORT}/auth/signup`);
});