const express = require('express');
const bodyParser = require('body-parser');

// security package
const cors = require('cors');
const companyRoutes = require('./routes/companyRoutes');
require('dotenv').config();

const app = express();

// enable cors for all request
app.use(cors());

app.use(bodyParser.json());

app.use('/api/cms', companyRoutes);
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});