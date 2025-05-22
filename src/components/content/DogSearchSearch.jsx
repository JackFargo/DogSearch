import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

export default function DogSearchSearch() {
    const [breeds, setBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBreeds();
    }, []);

    const fetchBreeds = async () => {
        try {
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setBreeds(data);
            } else {
                setError('Failed to fetch breeds');
            }
        } catch (err) {
            setError('Error fetching breeds');
        }
    };

    const handleSearch = async () => {
        try {
            setLoading(true);
            const queryParams = new URLSearchParams();
            if (selectedBreeds.length > 0) {
                selectedBreeds.forEach(breed => queryParams.append('breeds', breed));
            }
            
            const response = await fetch(`https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`, {
                credentials: 'include'
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.resultIds.length > 0) {
                    const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(data.resultIds)
                    });
                    if (dogsResponse.ok) {
                        const dogsData = await dogsResponse.json();
                        setDogs(dogsData);
                    }
                }
            }
        } catch (err) {
            setError('Error searching dogs');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h1>Search Dogs</h1>
            <Form className="mb-4">
                <Form.Group className="mb-3">
                    <Form.Label>Select Breeds</Form.Label>
                    <Form.Select
                        multiple
                        value={selectedBreeds}
                        onChange={(e) => setSelectedBreeds(Array.from(e.target.selectedOptions, option => option.value))}
                    >
                        {breeds.map(breed => (
                            <option key={breed} value={breed}>{breed}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </Form>

            {error && <div className="alert alert-danger">{error}</div>}

            <Row>
                {dogs.map(dog => (
                    <Col key={dog.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={dog.img} />
                            <Card.Body>
                                <Card.Title>{dog.name}</Card.Title>
                                <Card.Text>
                                    <strong>Breed:</strong> {dog.breed}<br />
                                    <strong>Age:</strong> {dog.age}<br />
                                    <strong>Location:</strong> {dog.zip_code}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
} 