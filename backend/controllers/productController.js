import { getProducts, getProductById, deleteProduct as deleteProductById } from '../models/Product.js'; 

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(products));
    } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

export const fetchProductById = async (req, res) => {
    const id = parseInt(req.url.split('/')[3], 10);
    try {
        const product = await getProductById(id);
        if (product) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(product));
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Product not found' }));
        }
    } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

export const deleteProduct = async (req, res) => {
    const id = parseInt(req.url.split('/')[3], 10);
    try {
        const result = await deleteProductById(id);
        if (result.deletedCount > 0) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Product deleted successfully' }));
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Product not found' }));
        }
    } catch (error) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};
