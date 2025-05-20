const express = require('express');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');
const memberRoutes = require('./routes/memberRoutes');
const managerRoutes = require('./routes/managerRoutes');

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/companies', companyRoutes);
app.use('/projects', projectRoutes);
app.use('/tasks', taskRoutes);
app.use('/members', memberRoutes);
app.use('/managers', managerRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});