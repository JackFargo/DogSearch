import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet, useLocation } from "react-router-dom";
import './DogSearchLayout.css';

function DogSearchLayout() {
    const [loginStatus, setLoginStatus] = useState(false);
    const [name, setName] = useState('');
    const location = useLocation();

    // Update login status whenever the location changes
    useEffect(() => {
        const isLoggedIn = Boolean(sessionStorage.getItem("isLoggedIn"));
        const name = sessionStorage.getItem("userName");
        setLoginStatus(isLoggedIn);
        setName(name);
    }, [location]);

    const render_login_status = () => {
        if (loginStatus)
        {
            
            return (
                <>
                    <Nav.Link id="search-link" as={Link} to="/search">Search🔎</Nav.Link>
                    <Nav.Link id="logout-link" as={Link} to="/logout">Logout</Nav.Link>
            
                </>
                )
        } else {
            return (
                <>
                    <Nav.Link id="login-link" as={Link} to="/login">Login</Nav.Link>
                </>
            )
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{ zIndex: 1000 }}>
                <Container className="dog-topbar-container">
                    <Navbar.Brand as={Link} to="/">
                        🐕 Dog Search
                    </Navbar.Brand>
                    <Nav className="login-status-nav">
                        {render_login_status()}
                    </Nav>
                    <Container className="login-status-name">Currently Logged in as {name}.</Container>
                </Container>
            </Navbar>
            <div>
                <Outlet />
            </div>
        </div>
    );
}

export default DogSearchLayout;