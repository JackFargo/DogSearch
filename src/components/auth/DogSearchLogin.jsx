import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function DogSearchLogin() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                // Store user information in session storage
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userName', name);
                sessionStorage.setItem('userEmail', email);
                
                // Log the stored information
                console.log('Login successful!');
                console.log('isLoggedIn:', sessionStorage.getItem('isLoggedIn'));
                console.log('Name:', sessionStorage.getItem('userName'));
                console.log('Email:', sessionStorage.getItem('userEmail'));
                
                navigate('/search');
            } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Login failed. Please check your credentials and try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '500px' }}>
            
            <h1 className="text-center mb-4">Welcome to Dog Search</h1>
            <Form onSubmit={handleSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </Button>

                </Form>
                
        </Container>
    );
}

