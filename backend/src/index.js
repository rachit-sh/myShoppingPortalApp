import dotenv from 'dotenv';

dotenv.config();
// Here, we did not use { path: './config/.env' } because by default it looks for .env file in the root directory

import connectDB from './config/database.js';
import app from './app.js';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        await connectDB();

        app.on('error', (err) => {
            console.error('Server error:', err);
            throw err;
        });
        
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
