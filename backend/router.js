import orderRoutes from './routes/orderRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


const handleRequest = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url.startsWith('/api/products')) {
        productRoutes(req, res);
    } else if (req.url.startsWith('/api/login') || req.url.startsWith('/api/register')) {
        userRoutes(req, res);
    } else if(req.url.startsWith('/api/orders')){
        orderRoutes(req, res);
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default handleRequest;
