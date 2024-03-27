const express = require('express');
const app = express();

// Error handlers
const errorMiddleware = require('./middleware/error');


app.use(express.json());


// Import all Routes

const products = require('./routes/product');


app.use('/api/v1', products)

// Middleware for Handle Errors
app.use(errorMiddleware);

module.exports = app