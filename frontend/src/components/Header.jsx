import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth.js';

const Header = () => {
    const { currentUser, logout, isLoading } = useAuth();
    
    // Place all navigation links here
    return (
        <header className="app-header">
            <nav>
                <Link to="/" className="nav-link logo-link">🛒 My Shopping Portal</Link>
                
                <div className="nav-links-right">
                    {/* Add Profile Link ONLY if logged in */}
                    {currentUser && <Link to="/profile" className="nav-link">👤 Profile</Link>}

                    <Link to="/cart" className="nav-link">🛍️ Cart</Link>

                    {/* Conditional rendering based on authentication status */}
                    {currentUser ? (
                        <>
                            <span className="welcome-message">Welcome, {currentUser.username}!</span>
                            <button 
                                onClick={logout} 
                                disabled={isLoading}
                                className="nav-link auth-button"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Log In</Link>
                            <Link to="/signup" className="nav-link primary-link">Sign Up</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
