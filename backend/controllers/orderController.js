import { createOrder, getOrderByCode } from '../models/Order.js';

export const handleCreateOrder = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const orderData = JSON.parse(body);
        try {
            const { orderCode } = await createOrder(orderData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Order created', orderCode }));
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error creating order' }));
        }
    });
};

export const handleGetOrderByCode = async (orderCode, res) => {
    try {
        const order = await getOrderByCode(orderCode);
        if (order) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(order));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Order not found' }));
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching order' }));
    }
};
