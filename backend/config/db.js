import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.MONGODB_URL;
let dbClient;

export const connectDB = async () => {
    try {
        dbClient = new MongoClient(dbURL);
        await dbClient.connect();
        console.log('MongoDB connected successfully');
        return dbClient.db(); 
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export const getDB = () => {
    if (!dbClient) {
        throw new Error('Database not connected');
    }
    return dbClient.db(); 
};
