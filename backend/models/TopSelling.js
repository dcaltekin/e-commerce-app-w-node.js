import { getDB } from '../config/db.js';

const productsCollection = () => {
    const db = getDB();
    return db.collection('products');
};

const ordersCollection = () => {
    const db = getDB();
    return db.collection('orders');
};

export const getTopSellingProducts = async (limit = 10) => {
    try {
        const orders = ordersCollection();
        const products = productsCollection();
        const salesData = await orders.aggregate([
            { $unwind: "$cartItems" },
            {
                $group: {
                    _id: "$cartItems._id",
                    totalQuantity: { $sum: "$cartItems.quantity" },
                    name: { $first: "$cartItems.name" },
                    price: { $first: "$cartItems.price" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: limit }
        ]).toArray();

        if (salesData.length === 0) {
            return [];
        }

        const productIds = salesData.map(item => item._id);
        const productDetails = await products.find({ _id: { $in: productIds } }).toArray();
        const topSellingProducts = salesData.map(sale => {
            const productDetail = productDetails.find(product => product._id.toString() === sale._id.toString());
            return {
                _id: sale._id,
                name: sale.name,
                price: sale.price,
                totalQuantity: sale.totalQuantity,
                stock: productDetail ? productDetail.stock : 0
            };
        });

        return topSellingProducts;
    } catch (error) {
        console.error('Error fetching top-selling products:', error);
        throw error;
    }
};
