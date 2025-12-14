import { User } from '../models/user.model.js';

const signupUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // basic validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // create new user
        const newUser = new User({
            username: username.toLowerCase().trim(),
            email: email.toLowerCase().trim(),
            password: password, // will be hashed in pre-save hook
            loggedIn: false // Indicating user is not logged in upon registration automatically.
        });
        await newUser.save();
        
        return res.status(201).json({
            message: 'User registered successfully',
            user: { userId: newUser._id, username: newUser.username, email: newUser.email }
        });

    } catch (error) {
        console.error(`Error registering user: ${error.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // basic validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // check if user exists
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check password match (hashed comparison using comparePassword method from user model(user.model.js))
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // generate the access token
        const accessToken = user.generateAuthToken();

        // configure cookie options
        const cookieOptions = {
            httpOnly: true, // Prevents client-side JS from accessing the cookie
            secure: process.env.NODE_ENV === 'production', // Ensures cookie is sent over HTTPS in production
            sameSite: 'strict', // Mitigates CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // 1 day expiration
        };

        // set the token in an HTTP-only cookie
        return res
            .status(200)
            .cookie('accessToken', accessToken, cookieOptions)
            .json({
                message: 'User logged in successfully',
                user: { userId: user._id, username: user.username, email: user.email }
                //! We don't send the token in the JSON response body, only in the cookie.
            });

    } catch (error) {
        console.error(`Error logging in user: ${error.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        message: 'Current user details fetched successfully',
        user: req.user // req.user contains the user's data (without the password)
    });
};

const logoutUser = async (req, res) => {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0 // Set maxAge to 0 or a past date to immediately expire the cookie
        };

        return res
            .status(200)
            .clearCookie('accessToken', cookieOptions)
            .json({
                message: 'User logged out successfully'
            });

    } catch (error) {
        console.error(`Error logging out user: ${error.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
};

export { signupUser, loginUser, getCurrentUser, logoutUser };
