import { loginUser, registerUser } from '../controllers/userController.js';

const userRoutes = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/login' && req.method === 'POST') {
        loginUser(req, res);
    } else if (req.url === '/api/register' && req.method === 'POST') {
        registerUser(req, res);
    } else if (req.url === '/api/protected' && req.method === 'GET') {
        authenticateToken(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'Protected resource accessed' }));
        });
    } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

export default userRoutes;
