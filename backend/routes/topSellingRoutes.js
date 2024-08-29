import { handleGetTopSellingProducts } from '../controllers/topSellingControllers.js';

const topSellingRoutes = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/top-selling' && req.method === 'GET') {
        handleGetTopSellingProducts(req, res);
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default topSellingRoutes;
