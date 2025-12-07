import express from 'express';

// routes import
import userRouter from './routes/user.route.js';
// import postRouter from './routes/post.route.js';

const app = express(); // Initialize Express app

app.use(express.json()); // Middleware to parse JSON bodies

// routes declaration
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/posts', postRouter);

// example route: http://localhost:4000/api/v1/users/register

app.get('/', (req, res) => {
    res.send('Welcome to the Backend API');
});

export default app;