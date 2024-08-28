import { getDB } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';
import orderEmitter from '../events/orderEvents.js'; 
import { ObjectId } from 'mongodb';

const ordersCollection = () => {
    const db = getDB();
    return db.collection('orders');
};
const productsCollection = () => {
    const db = getDB();
    return db.collection('products');
};


export const createOrder = async (order) => {
    const collection = ordersCollection();
    const products = productsCollection();

    const orderCode = uuidv4();
    const newOrder = { ...order, orderCode };

    try {
        const result = await collection.insertOne(newOrder);
        const updatePromises = order.cartItems.map((item) => {
            const productId = typeof item._id === 'string' ? item._id : item._id.toString();
            return products.updateOne(
                { _id: new ObjectId(productId) },
                { $inc: { stock: -item.quantity } } 
            );
        });

        await Promise.all(updatePromises);

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
