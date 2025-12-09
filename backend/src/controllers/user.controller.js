import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
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

        return res.status(200).json({
            message: 'User logged in successfully',
            user: { userId: user._id, username: user.username, email: user.email }
        });

    } catch (error) {
        console.error(`Error logging in user: ${error.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
};

/*
const logoutCurrentUser = async (req, res) => {
    try {
        /// In a real-world application, you would handle session/token invalidation here.

        /// A detailed implementation is as follows:
        const userId = req.user.id; // assuming user ID is available in req.user from authentication middleware
        
        /// find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        /// perform logout logic (e.g., invalidate session/token)
        return res.status(200).json({
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.error(`Error logging out user: ${error.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
};
*/

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        // basic validation
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // check if user exists
        const user = await User.findOne({ email: email.toLowerCase().trim() });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: 'User logged out successfully'
        });

    } catch (error) {
        console.error(`Error logging out user: ${error.message}`);
        return res.status(500).json({ message: 'Server error' });
    }
};

export { registerUser, loginUser, logoutUser };
