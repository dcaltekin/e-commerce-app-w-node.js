import { fetchAllProducts, fetchProductById, deleteProduct, updateProduct } from '../controllers/productController.js';

const productRoutes = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    const urlParts = req.url.split('/');
    const resource = urlParts[2];
    const id = urlParts[3];

    if (resource === 'products') {
        if (req.method === 'GET') {
            if (id) {
                fetchProductById(req, res);
            } else {
                fetchAllProducts(req, res);
            }
        } else if (req.method === 'DELETE' && id) {
            deleteProduct(req, res);
        } else if (req.method === 'PUT' && id) {
            updateProduct(req, res);
        } else {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Method Not Allowed' }));
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default productRoutes;
