const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// TODO Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());
// decode the jwt so we can get the user ID on each request
server.express.use((req, res, next) => {
    const { token } = req.cookies;
    if (token) {
        const { userId } = jwt.verify(token, process.env.APP_SECRET);
        // put userId onto request for further requests
        req.userId = userId;
    }
    next();
});


server.start({
    cors: {
        credentials: true,
        origin: process.env.FRONTEND_URL,
    },
}, details => {
    console.log(`Server is now running on port http://localhost:${details.port}`);
    }
);
