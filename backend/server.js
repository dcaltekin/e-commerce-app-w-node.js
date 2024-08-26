import http from 'http';
import connectDB from './config/db.js';

import handleRequest from './router.js';
connectDB();

const server = http.createServer(handleRequest);

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Node.js server running at http://localhost:${PORT}`);
});
