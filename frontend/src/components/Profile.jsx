import React from 'react';
import { useAuth } from '../context/useAuth';

const Profile = () => {
    // We already have the user details from the context, thanks to the login process and checkAuth
    const { currentUser, isLoading } = useAuth(); 

    if (isLoading) {
        return (
            <div className="main-content-area">
                <h2>Loading profile details...</h2>
            </div>
        );
    }

    if (!currentUser) {
        // This should theoretically not happen if the route is protected, 
        // but it's good practice to handle the unauthenticated state.
        return (
            <div className="main-content-area">
                <h2>Please log in to view your profile.</h2>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {/* The profile-card provides the modern dashboard container structure */}
            <div className="profile-card">
                
                {/* Visual Header Banner with the floating avatar wrapper */}
                <div className="profile-header-banner">
                    <div className="profile-avatar-wrapper">
                        👤
                    </div>
                </div>

                <div className="profile-content">
                    <h1>User Profile</h1>

                    {/* Each profile-field creates a structured row with label and value */}
                    <div className="profile-field">
                        <span className="field-label">User ID</span>
                        <span className="field-value">{currentUser.userId}</span>
                    </div>

                    <div className="profile-field">
                        <span className="field-label">Username</span>
                        <span className="field-value">{currentUser.username}</span>
                    </div>

                    <div className="profile-field">
                        <span className="field-label">Email Address</span>
                        <span className="field-value">{currentUser.email}</span>
                    </div>

                    <div className="profile-field">
                        <span className="field-label">Account Status</span>
                        <span className="field-value" style={{ color: 'var(--success)' }}>Active</span>
                    </div>
                    
                    <p className="note" style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        Note: For security, the backend only returns the user's ID, username, and email. 
                        No password or sensitive tokens are exposed here.
                    </p>
                    
                    {/* Future implementation: Add an "Edit Profile" button here */}
                    <button 
                        className="auth-submit-button" 
                        style={{ marginTop: '1.5rem' }}
                        onClick={() => alert("Edit Profile coming soon!")}
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
