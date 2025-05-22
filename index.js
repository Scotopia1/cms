const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const cors = require('cors');
const authRoutes = require('./routes/uiRoutes');
const companyRoutes = require('./routes/companyRoutes');
const memberRoutes = require('./routes/memberRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const managerRoutes = require('./routes/managerRoutes');
const taskMemberRoutes = require('./routes/taskMemberRoutes');
const handledByRoutes = require('./routes/handledbyRoutes');
const worksForRoutes = require('./routes/worksforRoutes');

require('dotenv').config();

const app = express();

// enable cors for all request
app.use(cors());
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/ui', authRoutes);
app.use('/api/cms/companies', companyRoutes);
app.use('/api/cms/company/members', memberRoutes);
app.use('/api/cms/company/projects', projectRoutes);
app.use('/api/cms/company/project/tasks', taskRoutes);
app.use('/api/cms/company/managers', managerRoutes);
app.use('/api/cms/company/task-member', taskMemberRoutes);
app.use('/api/cms/company/handled-by', handledByRoutes);
app.use('/api/cms/company/works-for', worksForRoutes);

app.get('/', async (req, res)=>{
    res.render("HomeView"
    , {
        title: 'Home',
        });
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
    console.log(`http://localhost:${PORT}`);
});