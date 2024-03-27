const app = require('./app');
const connectDatabase = require('./config/database');

const dotenv = require('dotenv');

// Config file

dotenv.config({path: 'backend/config/config.env' })


// Connect Database

connectDatabase();


app.listen(process.env.PORT, () => {
    console.log(`Server is Running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})