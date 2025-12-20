import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Helper: Define the base URL for the API calls
const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1', // Base URL for all endpoints
    withCredentials: true, // Crucial for sending/receiving HTTP-only cookies
    headers: {
        'Content-Type': 'application/json',
    }
});

export const AuthProvider = ({ children }) => {
    // State to store the logged-in user data
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // --- Authentication Functions ---

    // 1. Function to handle Sign Up
    const signup = async (username, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post(`/users/signup`, {
                username,
                email,
                password,
            });
            setIsLoading(false);
            return response.data; // Success message
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'Signup failed');
            throw err; // Re-throw the error for the component to handle
        }
    };

    // 2. Function to handle Login
    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post(`/users/login`, { email, password });
            
            // The token is now stored in an HTTP-only cookie by the browser.
            // We can rely on the backend's /current-user endpoint to get the user data after login.
            const user = response.data.user; 
            setCurrentUser(user);
            setIsLoading(false);
            return response.data;
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'Login failed');
            throw err;
        }
    };

    // 3. Function to handle Logout
    const logout = async () => {
        setIsLoading(true);
        try {
            await api.post(`/users/logout`);
        } catch (err) {
            console.error('Logout error:', err);
        } finally {
            // Cookies are cleared by the backend, but always clear local state even if backend errors
            setCurrentUser(null);
            setIsLoading(false);
        }
    };
    
    // 4. Function to check authentication state (e.g., on page load)
    // This calls the protected route /current-user to verify the cookie validity
    const checkAuth = async () => {
        // If we already have a user in memory, don't hit the API again
        if (currentUser) return; 

        try {
            // We blindly try to get the user. If the httpOnly cookie is missing/invalid, 
            // the backend will throw 401, and we catch it below.
            const response = await api.get(`/users/current-user`);
            setCurrentUser(response.data.user);
        } catch (err) {
            // If verification fails (expired token), the backend clears the cookie.
            setCurrentUser(null);
            console.error('Error:', err);
        }
    };

    return (
        <AuthContext.Provider value={{ currentUser, isLoading, error, login, logout, signup, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
