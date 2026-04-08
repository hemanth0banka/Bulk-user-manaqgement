const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middleware
app.use(cors());
// Increased limit to handle 5,000+ user records in a single request
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Basic health check
app.get('/', (req, res) => {
    res.send('Bulk User Management API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message
    });
});

module.exports = app;
