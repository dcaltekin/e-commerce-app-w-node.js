import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbURL = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
};

export default connectDB;
