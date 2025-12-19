import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

const Header = () => {
    const { currentUser, logout, isLoading } = useAuth();
    
    // Place all navigation links here
    return (
        /* The app-header class provides the sticky glass-morphic effect from App.css */
        <header className="app-header">
            <nav>
                {/* Logo/Home Link: Uses logo-link for distinct professional branding */}
                <Link to="/" className="nav-link logo-link">🛒 My Shopping Portal</Link>
                
                {/* This container uses flex-gap to ensure links and buttons never feel 'squished' */}
                <div className="nav-links-right">
                    {/* Add Profile Link ONLY if logged in */}
                    {currentUser && <Link to="/profile" className="nav-link">👤 Profile</Link>}

                    <Link to="/cart" className="nav-link">🛍️ Cart</Link>

                    {/* Conditional rendering based on authentication status */}
                    {currentUser ? (
                        <>
                            {/* Welcome message styled as a distinct pill badge */}
                            <span className="welcome-message">Welcome, {currentUser.username}!</span>
                            
                            {/* Logout button uses the nav-link class for consistent sizing */}
                            <button 
                                onClick={logout} 
                                disabled={isLoading}
                                className="nav-link auth-button"
                                style={{ background: 'transparent', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Log In</Link>
                            {/* Primary-link styling can be used to make the Sign Up button stand out */}
                            <Link to="/signup" className="nav-link primary-link" style={{ color: 'var(--primary)', fontWeight: '700' }}>Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
