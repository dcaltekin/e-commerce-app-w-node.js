import { generateToken, authenticateToken } from '../config/auth.js';

const userRoutes = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.url === '/api/login' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            if (username === 'admin' && password === '1234') {
                const token = generateToken({ id: 1, username });
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ token }));
            } else {
                res.statusCode = 401;
                res.end(JSON.stringify({ message: 'Invalid username or password' }));
            }
        });
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
