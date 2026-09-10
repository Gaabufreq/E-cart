import rateLimit from 'express-rate-limit'
import { AppError } from '../utils/AppError.js'

// Auth Routes Limiter (15 minutes me max 10 requests per IP)

export const authRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, //limit each IP to 10 requests per windowMs
    standardHeaders:true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) =>{
        next(new AppError("Too many login/register attempts from this IP, please try again after 15 minutes.", 429));
    }
});


// General API Limiter (15 minutes me max 100 requests per IP)

export const apiRateLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, //limit each IP to 10 requests per windowMs
    standardHeaders:true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders:false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        next(new AppError("Too many requests from this IP, please try again later.", 429))
    }
})