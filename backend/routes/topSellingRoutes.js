import { handleGetTopSellingProducts } from '../controllers/topSellingControllers.js';
import { authenticateToken } from '../config/auth.js';

const topSellingRoutes = async (req, res) => {

    if (req.url === '/api/top-selling' && req.method === 'GET') {
        authenticateToken(req, res, async () => {
            await handleGetTopSellingProducts(req, res);
        });
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};


export default topSellingRoutes;
