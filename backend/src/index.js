import dotenv from 'dotenv';
import connectDB from './config/database.js';
import app from './app.js';

dotenv.config({
    path: './.env'
});

const startServer = async () => {
    try {
        await connectDB();

        app.on('error', (err) => {
            console.error('Server error:', err);
            throw err;
        });
        
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();