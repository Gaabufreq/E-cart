import mongoose from "mongoose";

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`Database Connection Error: ${error.message}`);
        process.exit(1)
    }
};
