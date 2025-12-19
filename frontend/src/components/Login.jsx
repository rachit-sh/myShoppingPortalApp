import React, { useState } from 'react';
import { useAuth } from '../context/useAuth.js';
import { Link } from 'react-router-dom';

const Login = () => {
    const { login, isLoading, error, currentUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Optional: Redirect logic can be added here using react-router-dom

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // Login successful! Context state is updated.
        } catch (err) {
            // Error is handled by the context hook
            console.error('Error:', err);
        }
    };

    if (currentUser) {
        // Optional: Show a message or redirect if already logged in
        return (
            <div className="main-content-area">
                <div className="auth-form-container" style={{ textAlign: 'center' }}>
                    <h2>Welcome Back!</h2>
                    <p>You are already logged in as **{currentUser.username}**.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="auth-form-container">
            <h2>Log In</h2>
            <p className="auth-subtitle">Welcome back! Please enter your details.</p>

            <form onSubmit={handleSubmit}>
                {/* Display error message if the auth context catches one */}
                {error && <div className="form-message error">{error}</div>}
                
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
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="auth-submit-button" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Sign In'}
                </button>
            </form>

            <div className="auth-switch">
                <p>Don't have an account? <Link to="/signup">Create one for free</Link></p>
            </div>
        </div>
    );
};

export default Login;
