import { verifyPassword, generateToken } from '../config/auth.js';
import { findUserByUsername, createUser } from '../models/User.js';

export async function loginUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { username, password } = JSON.parse(body);
        const storedUser = await findUserByUsername(username);

        if (storedUser && await verifyPassword(password, storedUser.password, storedUser.salt)) {
            const token = generateToken({ id: storedUser._id, username });
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ token }));
        } else {
            res.statusCode = 401;
            res.end(JSON.stringify({ message: 'Invalid username or password' }));
        }
    });
}

export async function registerUser(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { username, password } = JSON.parse(body);
        try {
            const existingUser = await findUserByUsername(username);
            if (existingUser) {
                res.statusCode = 409;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ message: 'Username already exists' }));
                return;
            }

            await createUser(username, password);
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ message: 'User registered successfully' }));
        } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: 'Registration failed. Please try again.' }));
        }
    });
}
