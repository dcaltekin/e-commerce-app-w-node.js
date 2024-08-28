import { getProducts, getProductById, deleteProduct as deleteProductById, updateProductById } from '../models/Product.js';

const handleResponse = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

export async function fetchAllProducts(req, res) {
    try {
        const products = await getProducts();
        handleResponse(res, 200, products);
    } catch (error) {
        handleResponse(res, 500, { message: 'Internal Server Error' });
    }
};

export async function fetchProductById(req, res) {
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

export async function deleteProduct(req, res){
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

export async function updateProduct (req, res) {
    const id = parseInt(req.url.split('/')[3], 10);
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const updatedData = JSON.parse(body);
            const updatedProduct = await updateProductById(id, updatedData);

            if (updatedProduct) {
                handleResponse(res, 200, updatedProduct);
            } else {
                handleResponse(res, 404, { message: 'Product not found' });
            }
        } catch (error) {
            handleResponse(res, 500, { message: 'Internal Server Error' });
        }
    });
};
