import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { AppError } from '../utils/AppError.js'
import { redis } from '../config/redis.js'

export class AuthServices {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async registerUser({name,email,password,role}) {
        const existingUser = await this.userRepository.findByEmail(email) 
        if(existingUser){
            throw new AppError("User with this email already exists", 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await this.userRepository.create({
            name,
            email,
            password:hashedPassword,
            role:role || "user",
        });

        const token = this.generateToken(newUser._id, newUser.role)
        return{
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role
            },
            token,
        };       
    }

    async loginUser({email, password}){
        const user = await this.userRepository.findByEmail(email)
        if(!user){
            throw new AppError("Invalid email or password", 401)
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            throw new AppError("Invalid email or password", 401)
        }
        // Login hone par Stale Redis Cache Invalidate/Clear karein
        const cacheKey = `user:${user._id}`;
        try {
            await redis.del(cacheKey);
        } catch (error) {} // Redis error ignore



        const token = this.generateToken(user._id, user.role);

        return{
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            token,
        };

    }

    async getUserProfile(userId){
        const cacheKey = `user:${userId}`;
        // 1. Check Redis Cache First

        try{
            const cachedUser = await redis.get(cacheKey);
            if(cachedUser){
                return { source: 'cache', data: JSON.parse(cachedUser)};
            }
        }catch(error){
            // Redis error handle without crashing DB flow
        }

        // 2. Fetch from Database if Cache Miss

        const user = await this.userRepository.findById(userId)
        if(!user){
            throw new AppError("User not found", 404)
        }

        // 3. Save to Redis Cache (TTL: 1 Hour = 3600 seconds)

        try{
            await redis.set(cacheKey, JSON.stringify(user), 'EX', 3600)
        }catch(error){
            // Redis set error ignore
        }

        return { source: 'database', data: user };

    }


    generateToken(id,role){
        return jwt.sign({id , role}, process.env.JWT_SECRET , {
            expiresIn:process.env.JWT_EXPIRES_IN || "14d"
        });
    }

}