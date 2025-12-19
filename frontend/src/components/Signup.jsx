import React, { useState } from 'react';
import { useAuth } from '../context/useAuth.js';
import { Link } from 'react-router-dom';

const Signup = () => {
    const { signup, isLoading, error } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const result = await signup(username, email, password);
            setMessage(result.message + '. Please log in.');
            // Clear form
            setUsername('');
            setEmail('');
            setPassword('');
        } catch (err) {
            // The error state from context handles error display
            console.error('Error:', err);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Create Account</h2>
            <p className="auth-subtitle">Join us to start your shopping journey.</p>

            <form onSubmit={handleSubmit}>
                {/* Dynamic messages for user feedback (Error or Success) */}
                {error && <div className="form-message error">{error}</div>}
                {message && <div className="form-message success">{message}</div>}
                
                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="JohnDoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Min. 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="auth-submit-button" disabled={isLoading}>
                    {isLoading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>

            <div className="auth-switch">
                <p>Already have an account? <Link to="/login">Sign in here</Link></p>
            </div>
        </div>
    );
};

export default Signup;
