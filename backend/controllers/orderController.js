import { createOrder, getOrderByCode, getAllOrders, updateOrderStatus } from '../models/Order.js';
import logger from '../config/logger.js';

const handleResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

export async function handleCreateOrder(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const orderData = JSON.parse(body);
        try {
            const { orderCode } = await createOrder(orderData);
            handleResponse(res, 201, { message: 'Order created', orderCode });
            logger.info(`Sipariş oluşturuldu. Verilen kod: ${orderCode}`);
        } catch (error) {
            logger.error(`Error creating order: ${error.message}`);
            handleResponse(res, 500, { message: 'Error creating order' });
        }
    });
};

export async function handleGetOrderByCode(orderCode, res){
    try {
        const order = await getOrderByCode(orderCode);
        if (order) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(order));
            logger.info(`Sipariş listelendi. Kod: ${orderCode}`);
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Order not found' }));
            logger.warn(`Hata. ${orderCode} kod bulunamadı.`);
        }

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error fetching order' }));
        logger.error(`Hata: ${orderCode} - ${error.message}`);
    }
};


export async function handleGetAllOrders(req, res) {
    try {
        const orders = await getAllOrders();
        handleResponse(res, 200, orders);
        logger.info(`Bütün siparişler listelendi`);
    } catch (error) {
        logger.error(`Hata: ${error.message}`);
        handleResponse(res, 500, { message: 'Error fetching orders' });
    }
};

export async function handleUpdateOrderStatus(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { orderCode, newStatus } = JSON.parse(body);
        try {
            const result = await updateOrderStatus(orderCode, newStatus);
            if (result.modifiedCount > 0) {
                handleResponse(res, 200, { message: 'Order status updated' });
                logger.info(`Durum güncellendi. orderCode: ${orderCode}`);
            } else {
                handleResponse(res, 404, { message: 'Order not found' });
                logger.warn(`Hata. Sipariş bulunamadı. orderCode: ${orderCode}`);
            }
        } catch (error) {
            logger.error(`Hata: ${orderCode} - ${error.message}`);
            handleResponse(res, 500, { message: 'Error updating order status' });
        }
    });
};
