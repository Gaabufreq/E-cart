import { AppError } from '../utils/AppError.js'
import { logger } from '../config/logger.js'

export const globalErrorHandler = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Winston Error Logger Call
    logger.error(`${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);


// Production vs Development Error Response

if(process.env.NODE_ENV === "development") {
    return res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message,
        stack: err.stack
    });
}


// Production Clean Error (Hide Internal Stack Trace)

if(err.isOperational){
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

// Programming/Unknown Errors (Don't leak details to client)
console.error('Error',err);
return res.status(500).json({
    success:false,
    message:'Something went very wrong on server'
});

}