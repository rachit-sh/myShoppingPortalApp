import React, { useState } from 'react';
import { useAuth } from '../context/useAuth.js';

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
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}
                
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                    {isLoading ? 'Registering...' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Signup;
