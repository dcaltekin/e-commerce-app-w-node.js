import { getTopSellingProducts  } from '../models/TopSelling.js';
import logger from '../config/logger.js';


const handleResponse = (res, statusCode, data) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
};

export async function handleGetTopSellingProducts(req, res) {
    try {
        const topSellingProducts = await getTopSellingProducts();
        handleResponse(res, 200, topSellingProducts);
        logger.info('Çok satan ürünler listelendi');
    } catch (error) {
        handleResponse(res, 500, { message: 'Error fetching top-selling products' });
        logger.error(`Çok satılan ürünler hata: ${error.message}`);
    }
}