import { UserRepository } from "../repositories/user.repository.js";
import { AuthServices } from "../services/auth.service.js";
import { catchAsync } from "../utils/catchAsync.js";

const userRepository = new UserRepository();
const authService = new AuthServices(userRepository);

export class AuthController {
    register = catchAsync(async (req, res, next) => {
        const { name, email, password, role } = req.body;
        const result = await authService.registerUser({ name, email, password, role });

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result
        });
    });

    login = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;
        const result = await authService.loginUser({ email, password });

        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: result
        });
    });

    getProfile = catchAsync(async (req, res, next) => {
        const result = await authService.getUserProfile(req.user.id);

        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            source: result.source, // cache or database
            data: result.data,
        });
    });
}