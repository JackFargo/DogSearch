import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DogSearchNoMatch() {
    return (
        <Container className="mt-5 text-center">
            <h1>Woof Woof!</h1>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
                Return to Home
            </Link>
        </Container>
    );
}
