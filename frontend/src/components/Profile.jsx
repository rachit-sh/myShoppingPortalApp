import React from 'react';
import { useAuth } from '../context/useAuth';

const Profile = () => {
    // We already have the user details from the context, thanks to the login process and checkAuth
    const { currentUser, isLoading } = useAuth(); 

    if (isLoading) {
        return <h2>Loading profile details...</h2>;
    }

    if (!currentUser) {
        // This should theoretically not happen if the route is protected, 
        // but it's good practice to handle the unauthenticated state.
        return <h2>Please log in to view your profile.</h2>;
    }

    return (
        <div className="profile-container">
            <h1>👤 User Profile</h1>
            <div className="profile-info-card">
                <p><strong>User ID:</strong> {currentUser.userId}</p>
                <p><strong>Username:</strong> {currentUser.username}</p>
                <p><strong>Email:</strong> {currentUser.email}</p>
                
                <p className="note">
                    Note: For security, the backend only returns the user's ID, username, and email. 
                    No password or sensitive tokens are exposed here.
                </p>
                
                {/* Future implementation: Add an "Edit Profile" button here */}
            </div>
            
        </div>
    );
};

export default Profile;
