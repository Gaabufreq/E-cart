import dotenv from 'dotenv'
dotenv.config()
import app from './src/app.js'
import { connectdb } from './src/config/db.js'
import {connectRedis} from './src/config/redis.js'


const PORT = process.env.PORT || 8000

// connecting db 
connectdb().then(async() => {
    await connectRedis()
    app.listen(PORT, () =>{
        console.log(`🚀 Production Server running on port ${PORT}`);
        
    });
});