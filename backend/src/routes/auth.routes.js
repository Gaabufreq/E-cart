import {Router} from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js'
import {authRateLimiter} from '../middlewares/rateLimiter.middleware.js'

const authRouter = Router()
const authController = new AuthController()

    // Public Routes (protected by zod validation middleware)
    authRouter.post("/register",authRateLimiter , validate(registerSchema), authController.register);
    authRouter.post("/login",authRateLimiter , validate(loginSchema), authController.login);

    // Cache-backed Profile Endpoint
    authRouter.get("/profile", authenticate, authController.getProfile);

    // Protected Admin Route

    authRouter.get("/admin-dashboard", authenticate, authorize("admin"), (req,res) => {
        res.status(200).json({
            success:true,
            message:"Welcome to  Admin Dashboard!"
        });
    });

    export default authRouter
