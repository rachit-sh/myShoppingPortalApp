import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js'; // To potentially fetch up-to-date user data

const verifyJWT = async (req, res, next) => {
    try {
        // 1. Extract the Token from Cookies
        // We look for the 'accessToken' cookie, which was set in loginUser controller.
        const token = req.cookies?.accessToken;

        if (!token) {
            // Token is missing. Authentication failed.
            return res.status(401).json({ 
                message: 'Unauthorized request: Access token missing' 
            });
        }

        // 2. Verify the Token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Find User based on Payload
        // We find the user by the ID stored in the token payload.
        // We select the password field as 'false' to prevent it from being fetched.
        const user = await User.findById(decodedToken?._id).select("-password");

        if (!user) {
            // Token is valid but the user corresponding to the token no longer exists in the DB (e.g., deleted).
            // We should also clear the invalid cookie.
            res.clearCookie('accessToken');
            return res.status(401).json({ 
                message: 'Invalid Access Token: User not found' 
            });
        }

        // 4. Attach User Object to Request
        // The user object (without the password) is now available as req.user for all subsequent controllers.
        req.user = user;
        
        // Pass control to the next middleware or the route handler.
        next();

    } catch (error) {
        // Handle common JWT errors (e.g., TokenExpiredError, JsonWebTokenError)
        console.error("JWT Verification Error:", error.message);
        
        // Ensure the expired/invalid token cookie is cleared.
        res.clearCookie('accessToken');

        return res.status(401).json({
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

export default verifyJWT;
