import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

const handleRequest = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    if (req.url.startsWith('/api/products')) {
        productRoutes(req, res);
    } else if (req.url.startsWith('/api/login')) {
        userRoutes(req, res);
    } else if (req.url.startsWith('/api/protected')) {
        userRoutes(req, res);
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default handleRequest;
