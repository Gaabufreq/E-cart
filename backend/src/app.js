import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import authRouter from './routes/auth.routes.js';
import { AppError } from './utils/AppError.js'
import { globalErrorHandler } from './middlewares/error.middleware.js'
import { logger } from './config/logger.js'
import { apiRateLimiter } from './middlewares/rateLimiter.middleware.js';
import productRouter from './routes/product.route.js';
import cartRouter from './routes/cart.route.js';
import wishlistRouter from './routes/wishlist.routes.js';
import orderRouter from './routes/order.routes.js';

const app = express()

app.use(
    cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    })
)
app.use(express.json());

// Apply global rate limiting to all API routes
app.use('/api', apiRateLimiter)

// Morgan HTTP Logger connected to Winston
const morganFormat = ":method :url :status :res[content-length] - :response-time ms";
app.use(
    morgan(morganFormat, {
        stream:{
            write: (message) => logger.http(message.trim())
        }
    })
)

// Routes Mount

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/products",productRouter)
app.use("/api/v1/cart",cartRouter)
app.use("/api/v1/wishlist",wishlistRouter)
app.use("/api/v1/orders", orderRouter)


// Health Check

app.get("/health", (req,res) => {
    res.status(200).json({status:"UP", timestamp:new Date()})
})

// Handle Undefined Routes (404)
app.all("*path",(req,res,next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})

app.use(globalErrorHandler) // Global Error Handler (Humesha Sabse End Me Hoga)

export default app