// DogSearchLayout.jsx
import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useSecretDogMode } from '../../context/SecretDogModeContext';
import './DogSearchLayout.css';
import dogIcon from '../../figures/dog-icon.png';

import { FaBone } from 'react-icons/fa';
function DogSearchLayout() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [userName, setUserName] = useState('');
    const location = useLocation();
    const { secretDogMode, setSecretDogMode } = useSecretDogMode();

    useEffect(() => {
        const isLoggedIn = Boolean(sessionStorage.getItem("isLoggedIn"));
        const name = sessionStorage.getItem("userName");
        setLoginStatus(isLoggedIn);
        setUserName(name);
    }, [location]);

    const renderNavLinks = () => {
        if (loginStatus) {
            return (
                <>
                    <Link to="/search" className="nav-link">
                        Search 🔎
                    </Link>
                    <Link to="/logout" className="nav-link">
                        Logout
                    </Link>
                </>
            );
        }
        return (
            <Link to="/login" className="nav-link">
                Login
            </Link>
        );
    };

    const BoneIconButton = () =>
    {
        return (
            <button
                onClick={() => setSecretDogMode(!secretDogMode)}
                className={`secret-dog-mode-btn ${secretDogMode ? 'active' : ''}`}
            >
                <FaBone className="bone-icon" />
                {secretDogMode ? 'Secret Dog Mode Active' : 'Secret Dog Mode'}
            </button>
        );
    };

    return (
        <div>
            <Navbar bg="dark" variant="dark" expand="lg">
                <div className="navbar-container">
                    <div className="brand-links-container">
                        <Link to="/" className="navbar-brand">
                            <img src={dogIcon} alt="Dog Icon" className="dog-icon" />
                            Dog Search
                        </Link>
                        
                        <div className="nav-links">
                            {renderNavLinks()}
                        </div>
                    </div>
                    <div className="login-status-container">
                        {loginStatus && (
                            <div className="d-flex align-items-center">
                                <div className="login-status me-3">
                                    Logged in as {userName}
                                </div>
                                <BoneIconButton />
                            </div>
                        )}
                    </div>
                </div>
            </Navbar>
            
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default DogSearchLayout;