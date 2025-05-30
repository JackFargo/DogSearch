// DogSearchLayout.jsx
import React, { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CursorifyProvider } from '@cursorify/react';
import { useSecretDogMode } from '../../context/SecretDogModeContext';
import PawCursor from '../cursors/PawCursor';
import './DogSearchLayout.css';
import dogIcon from '../../figures/dog-icon.png';

function DogSearchLayout() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [userName, setUserName] = useState('');
    const location = useLocation();
    const { secretDogMode } = useSecretDogMode();

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

    return (
        <CursorifyProvider cursor={secretDogMode ? <PawCursor /> : null}>
            <div>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <div className="navbar-container">
                        <Link to="/" className="navbar-brand">
                            <img src={dogIcon} alt="Dog Icon" className="dog-icon" />
                            Dog Search
                        </Link>
                        
                        <div className="nav-links">
                            {renderNavLinks()}
                        </div>

                        {loginStatus && (
                            <div className="login-status">
                                Logged in as {userName}
                            </div>
                        )}
                    </div>
                </Navbar>
                
                <main>
                    <Outlet />
                </main>
            </div>
        </CursorifyProvider>
    );
}

export default DogSearchLayout;