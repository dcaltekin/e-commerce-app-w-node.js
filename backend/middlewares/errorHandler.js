import logger from '../config/logger.js';

export const errorHandler = (err, req, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    if (statusCode >= 500) {
        logger.error(`Status Code: ${statusCode}, Message: ${message}, URL: ${req.url}`);
    } else if (statusCode >= 400) {
        logger.warn(`Status Code: ${statusCode}, Message: ${message}, URL: ${req.url}`);
    } else if (statusCode >= 300) {
        logger.info(`Status Code: ${statusCode}, Message: ${message}, URL: ${req.url}`);
    } else {
        logger.http(`Status Code: ${statusCode}, Message: ${message}, URL: ${req.url}`);
    }

    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: false,
        message: message,
    }));
};
