const express = require('express');
const bodyParser = require('body-parser');

// security package
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
const memberRoutes = require('./routes/memberRoutes');
require('dotenv').config();

// Create express app
const app = express();

// enable cors for all request
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// Routes
app.use('/api/cms', companyRoutes);
app.use('/api/cms', memberRoutes);

// Start the server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});