import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DogSearchLogout() {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear login status
        sessionStorage.removeItem('isLoggedIn');
        // Redirect to home page
        navigate('/');
    }, [navigate]);

    return (
        <div className="text-center mt-5">
            <h1>Logout</h1>
            <p>You have been successfully logged out.</p>
        </div>
    );
}