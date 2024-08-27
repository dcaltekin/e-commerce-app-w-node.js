import { getProducts, getProductById, deleteProduct as deleteProductById } from '../models/Product.js'; 

const handleResponse = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

export const fetchAllProducts = async (req, res) => {
    try {
        const products = await getProducts();
        handleResponse(res, 200, products);
    } catch (error) {
        handleResponse(res, 500, { message: 'Internal Server Error' });
    }
};

export const fetchProductById = async (req, res) => {
    const id = parseInt(req.url.split('/')[3], 10);
    try {
        const product = await getProductById(id);
        if (product) {
            handleResponse(res, 200, product);
        } else {
            handleResponse(res, 404, { message: 'Product not found' });
        }
    } catch (error) {
        handleResponse(res, 500, { message: 'Internal Server Error' });
    }
};

export const deleteProduct = async (req, res) => {
    const id = parseInt(req.url.split('/')[3], 10);
    try {
        const result = await deleteProductById(id);
        if (result.deletedCount > 0) {
            handleResponse(res, 200, { message: 'Product deleted successfully' });
        } else {
            handleResponse(res, 404, { message: 'Product not found' });
        }
    } catch (error) {
        handleResponse(res, 500, { message: 'Internal Server Error' });
    }
};
