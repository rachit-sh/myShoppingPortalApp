import express from 'express';
import cors from 'cors';
/*
CORS is a middleware to enable Cross-Origin Resource Sharing
which allows your backend to accept requests from different origins.
This is especially useful when your frontend and backend are hosted
on different domains or ports during development.
*/
import cookieParser from 'cookie-parser';

// routes import
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import cartRouter from "./routes/cart.route.js";

// Define your exact frontend origin
const allowedOrigins = ['http://localhost:5173']

const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse JSON bodies

app.use(cors({ // Enable CORS
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or postman)
        if (!origin) return callback(null, true); 
        
        // Check if the requesting origin is in our allowed list
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Specify allowed methods
    credentials: true, // Crucial: This allows the browser to send/receive cookies
    optionsSuccessStatus: 200
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(cookieParser()); // Must be added before the routes

// routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/cart', cartRouter);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;
