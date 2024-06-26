const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    

    if(process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(err.statusCode).json({
            success: false,
            // error: err,
            Message: err.message,
            // stack: err.stack
        })
    }

    if(process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err }

        error.message = err.message;

        // Wrong Mongoose Object ID
        if(err.name === 'CastError') {
            const message = `Resource Not Found. Invalid: ${err.path}`
            error: new ErrorHandler(message, 400)
        }
        
        
        

        res.status(err.statusCode).json({
            success: false,
            error: err.message || 'Internal Server Error' // You can customize the error message format if needed
        });
    }
}

  
