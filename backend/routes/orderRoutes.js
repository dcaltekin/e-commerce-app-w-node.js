import { handleCreateOrder, handleGetOrderByCode, handleGetAllOrders, handleUpdateOrderStatus } from '../controllers/orderController.js';

const orderRoutes = (req, res) => {
    const urlParts = req.url.split('/');
    const resource = urlParts[2];
    const orderCode = urlParts[3];

    if (resource === 'orders') {
        if (req.method === 'POST') {
            handleCreateOrder(req, res);
        } else if (req.method === 'GET' && orderCode) {
            handleGetOrderByCode(orderCode, res);
        } else if (req.method === 'GET' ) {
            handleGetAllOrders(req, res);
        } else if (req.url === '/api/orders/status' && req.method === 'PUT') {
            handleUpdateOrderStatus(req, res);
        }  else {
            res.writeHead(405, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Method Not Allowed' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default orderRoutes;
