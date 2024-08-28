import { getDB } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import orderEmitter from '../events/orderEvents.js'; 

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
        const orders = await collection.find({}).toArray();
        return orders;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderCode, newStatus) => {
    try {
        const collection = ordersCollection();
        const result = await collection.updateOne(
            { orderCode },
            { $set: { status: newStatus } }
        );
        if (result.modifiedCount > 0) {
            orderEmitter.emit('orderStatusUpdated', orderCode, newStatus);
        }
        return result;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};
