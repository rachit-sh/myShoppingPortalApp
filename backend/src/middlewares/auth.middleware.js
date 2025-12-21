import jwt from 'jsonwebtoken';

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

        // Instead of querying the DB, we trust the token.
        // req.user now holds { _id, username, email } directly from the JWT payload.
        req.user = decodedToken;
        
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
