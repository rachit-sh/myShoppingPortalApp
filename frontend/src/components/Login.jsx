import React, { useState } from 'react';
import { useAuth } from '../context/useAuth.js';

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
        return <div>You are already logged in as {currentUser.username}.</div>;
    }

    return (
        <div className="auth-form-container">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging In...' : 'Log In'}
                </button>
            </form>
        </div>
    );
};

export default Login;
