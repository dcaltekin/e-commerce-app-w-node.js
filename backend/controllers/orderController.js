import { createOrder, getOrderByCode, getAllOrders, updateOrderStatus } from '../models/Order.js';

export async function handleCreateOrder(req, res){
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

export async function handleGetOrderByCode(orderCode, res){
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

export async function handleGetAllOrders(req, res){
    try {
        const orders = await getAllOrders();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(orders));
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching orders' }));
    }
};

export async function handleUpdateOrderStatus(req, res){
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { orderCode, newStatus } = JSON.parse(body);
        try {
            const result = await updateOrderStatus(orderCode, newStatus);
            if (result.modifiedCount > 0) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Order status updated' }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Order not found' }));
            }
        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error updating order status' }));
        }
    });
};
