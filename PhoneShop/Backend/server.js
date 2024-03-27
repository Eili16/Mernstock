const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');


// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server')
    
        process.exit(1)
});


// Config file

dotenv.config({path: 'backend/config/config.env' })


// Connect Database

connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})


// Handle Unhandled Rejection errors

process.on('Unhandled Rejection', error => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down the server')
    server.close(() => {
        process.exit(1)
    })
})