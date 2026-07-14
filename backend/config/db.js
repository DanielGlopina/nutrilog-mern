import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        // Fail during startup instead of accepting traffic without a database connection.
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is required');
        }

        connectionPromise ??= mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
        });

        const conn = await connectionPromise;
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        return conn;
    } catch (error) {
        connectionPromise = undefined;
        console.error(`MongoDB connection error: ${error.message}`);
        throw error;
    }
}

export default connectDB;
