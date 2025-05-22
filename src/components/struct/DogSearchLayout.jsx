import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";

function DogSearchLayout() {
    const initialLoginStatus = Boolean(sessionStorage.getItem("isLoggedIn"));
    const [loginStatus, setLoginStatus] = useState(initialLoginStatus);

    const render_login_status = () => {
        if (loginStatus) {
            return <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
        } else {
            return (
                <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </>
            )
        }
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" style={{ zIndex: 1000 }}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        🐕 Dog Search
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {render_login_status()}
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <Outlet />
            </div>
        </div>
    );
}

export default DogSearchLayout;