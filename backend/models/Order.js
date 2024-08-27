import { getDB } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

const ordersCollection = () => {
    const db = getDB();
    return db.collection('orders');
};

export const createOrder = async (order) => {
    try {
        const collection = ordersCollection();
        const orderCode = uuidv4();
        const newOrder = { ...order, orderCode };
        const result = await collection.insertOne(newOrder);
        return { result, orderCode };
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export const getOrderByCode = async (orderCode) => {
    try {
        const collection = ordersCollection();
        const order = await collection.findOne({ orderCode });
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

export const getAllOrders = async () => {
    try {
        const collection = ordersCollection();
        const order = await collection.find({}).toArray();
        return order;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};
