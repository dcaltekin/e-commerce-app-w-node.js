import { getDB } from '../config/db.js';

const productsCollection = () => {
    const db = getDB();
    return db.collection('products');
};

export const createProduct = async (product) => {
    try {
        const collection = productsCollection();
        const result = await collection.insertOne(product);
        return result;
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const collection = productsCollection();
        const products = await collection.find({}).toArray();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductById = async (id) => {
    try {
        const collection = productsCollection();
        const product = await collection.findOne({ id });
        return product;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const updateProduct = async (id, updateFields) => {
    try {
        const collection = productsCollection();
        const result = await collection.updateOne({ id }, { $set: updateFields });
        return result;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const collection = productsCollection();
        const result = await collection.deleteOne({ id });
        return result;
    } catch (error) {
        console.error('Error deleting product:', error);
        throw error;
    }
};
