import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSecretDogMode } from '../../context/SecretDogModeContext';

export default function DogSearchLogout() {
    const navigate = useNavigate();
    const { setSecretDogMode } = useSecretDogMode();

    useEffect(() => {
        // Clear all user information from session storage
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userEmail');
        
        // Reset secret dog mode
        setSecretDogMode(false);
        
        // Redirect to home page
        navigate('/');
    }, [navigate, setSecretDogMode]);

    return (
        <div className="text-center mt-5">
            <h1>Logout</h1>
            <p>You have been successfully logged out.</p>
        </div>
    );
}