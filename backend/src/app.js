import express from 'express';
import cors from 'cors';
/*
CORS is a middleware to enable Cross-Origin Resource Sharing
which allows your backend to accept requests from different origins.
This is especially useful when your frontend and backend are hosted
on different domains or ports during development.
*/

// routes import
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';

const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS

// routes declaration
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

// example route: http://localhost:4000/api/v1/users/register

app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});

export default app;
