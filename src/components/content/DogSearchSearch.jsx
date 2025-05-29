import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import './DogSearchSearch.css';

export default function DogSearchSearch() {
    // State for breeds
    const [breeds, setBreeds] = useState([]);
    const [selectedBreeds, setSelectedBreeds] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    // State for age filters
    const [ageMin, setAgeMin] = useState('');
    const [ageMax, setAgeMax] = useState('');
    
    // State for sorting
    const [sortField, setSortField] = useState('breed');
    const [sortDirection, setSortDirection] = useState('asc');
    
    // State for search results
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    // State for secret dog mode
    const [secretDogMode, setSecretDogMode] = useState(false);
    
    // State for match
    const [matchedDog, setMatchedDog] = useState(null);
    const [matching, setMatching] = useState(false);

    // Filter breeds based on search term
    const filteredBreeds = breeds.filter(breed => 
        breed.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Separate useEffect hooks for breeds and initial search
    useEffect(() => {
        fetchBreeds();
    }, []); // Only fetch breeds on mount

    // Add a separate useEffect for initial search
    useEffect(() => {
        const initialSearch = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    'https://frontend-take-home-service.fetch.com/dogs/search?size=15',
                    { credentials: 'include' }
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTotalResults(data.total);
                setNextPage(data.next);
                setPrevPage(data.prev);

                if (data.resultIds.length > 0) {
                    const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify(data.resultIds)
                    });

                    if (!dogsResponse.ok) {
                        throw new Error(`HTTP error! status: ${dogsResponse.status}`);
                    }

                    const dogsData = await dogsResponse.json();
                    setDogs(dogsData);
                }
            } catch (err) {
                setError(`Error loading initial results: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        initialSearch();
    }, []); // Only run initial search once on mount

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

    const handleSearch = async (pageQuery = '') => {
        try {
            setLoading(true);
            setError('');
            setMatchedDog(null);

            const queryParams = new URLSearchParams();
            
            if (selectedBreeds.length > 0) {
                selectedBreeds.forEach(breed => queryParams.append('breeds', breed));
            }
            
            if (ageMin) queryParams.append('ageMin', ageMin);
            if (ageMax) queryParams.append('ageMax', ageMax);
            
            queryParams.append('sort', `${sortField}:${sortDirection}`);
            
            if (pageQuery) {
                const pageNumber = pageQuery.split('from=')[1]?.split('&')[0] || pageQuery;
                queryParams.append('from', pageNumber);
            }
            
            queryParams.append('size', '15');

            const response = await fetch(
                `https://frontend-take-home-service.fetch.com/dogs/search?${queryParams.toString()}`,
                { credentials: 'include' }
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTotalResults(data.total);
            setNextPage(data.next);
            setPrevPage(data.prev);

            if (data.resultIds.length > 0) {
                const dogsResponse = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify(data.resultIds)
                });

                if (!dogsResponse.ok) {
                    throw new Error(`HTTP error! status: ${dogsResponse.status}`);
                }

                const dogsData = await dogsResponse.json();
                setDogs(dogsData);
            } else {
                setDogs([]);
            }
        } catch (err) {
            setError(`Error searching dogs: ${err.message}`);
            setDogs([]);
            setTotalResults(0);
            setNextPage(null);
            setPrevPage(null);
        } finally {
            setLoading(false);
        }
    };

    const handleMatch = async () => {
        if (dogs.length === 0) return;

        try {
            setMatching(true);
            const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(dogs.map(dog => dog.id))
            });

            if (response.ok) {
                const { match } = await response.json();
                const matchedDog = dogs.find(dog => dog.id === match);
                setMatchedDog(matchedDog);
            }
        } catch (err) {
            setError('Error finding match');
        } finally {
            setMatching(false);
        }
    };

    return (
        <Container fluid className={`mt-4 ${secretDogMode ? 'secret-dog-mode-active' : ''}`}>
            {/*<h1 className="title">Search Dogs</h1>*/}
            
            <Row>
                {/* Left side - Search Form */}
                <Col md={4} className="search-sidebar">
                    <Form className="mb-4 sticky-top" style={{ top: '20px' }}>
                        <h4 className="mb-3" style={{ alignItems: 'center' }}>Search Filters</h4>
                        
                        {/* Age Range and Sort in one row */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Age Range</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                placeholder="Min"
                                                value={ageMin}
                                                onChange={(e) => setAgeMin(e.target.value)}
                                                min="0"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                placeholder="Max"
                                                value={ageMax}
                                                onChange={(e) => setAgeMax(e.target.value)}
                                                min="0"
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Sort controls in one row */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Sort By</Form.Label>
                                    <Row>
                                        <Col>
                                            <Form.Select
                                                value={sortField}
                                                onChange={(e) => setSortField(e.target.value)}
                                            >
                                                <option value="breed">Breed</option>
                                                <option value="name">Name</option>
                                                <option value="age">Age</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Select
                                                value={sortDirection}
                                                onChange={(e) => setSortDirection(e.target.value)}
                                            >
                                                <option value="asc">↑ Asc</option>
                                                <option value="desc">↓ Desc</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Breed selection with search */}
                        <Form.Group className="mb-3">
                            <Form.Label>Select Breeds</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Search breeds..."
                                className="mb-2"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="breed-list" style={{ 
                                maxHeight: '200px', 
                                overflowY: 'auto',
                                border: '1px solid #ced4da',
                                borderRadius: '0.25rem',
                                padding: '0.75rem'
                            }}>
                                {filteredBreeds.map(breed => (
                                    <Form.Check
                                        key={breed}
                                        type="checkbox"
                                        id={breed}
                                        label={breed}
                                        checked={selectedBreeds.includes(breed)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedBreeds([...selectedBreeds, breed]);
                                            } else {
                                                setSelectedBreeds(selectedBreeds.filter(b => b !== breed));
                                            }
                                        }}
                                        className="mb-0"
                                    />
                                ))}
                            </div>
                            {selectedBreeds.length > 0 && (
                                <div className="selected-breeds mt-2">
                                    <small className="text-muted">Selected breeds: {selectedBreeds.join(', ')}</small>
                                </div>
                            )}
                        </Form.Group>

                        {/* Action Buttons */}
                        <Button 
                            variant="primary" 
                            onClick={() => handleSearch()} 
                            disabled={loading}
                            className="w-100 mb-2 search-button"
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                        </Button>

                        <Button 
                            variant="success" 
                            onClick={handleMatch} 
                            disabled={loading || matching || dogs.length === 0}
                            className="w-100 mb-2 match-button"
                        >
                            {matching ? <Spinner animation="border" size="sm" /> : 'Find Match'}
                        </Button>

                        {/* Secret Dog Mode moved here */}
                        <Form.Group className="mb-3">
                            <Container id="secret-dog-mode-container">
                                <Form.Check
                                    type="switch"
                                    id="secret-dog-mode-form"
                                    label={
                                        <span className="d-flex align-items-center">
                                            <span className="me-2">Secret Dog Mode</span>
                                            {secretDogMode && <span className="badge bg-success">Active</span>}
                                        </span>
                                    }
                                    checked={secretDogMode}
                                    onChange={(e) => setSecretDogMode(e.target.checked)}
                                />
                            </Container>
                        </Form.Group>
                    </Form>
                </Col>

                {/* Right side - Results */}
                <Col md={8}>
                    {error && <Alert variant="danger">{error}</Alert>}

                    {/* Match Result */}
                    {matchedDog && (
                        <Alert variant="success" className="matched-results">
                            <Container className="matched-results-container-img">
                                <Card.Img variant="top" src={matchedDog.img} />
                            </Container>
                            <Container className="matched-results-container-text">
                                <h4>Your Perfect Match!</h4>
                                <p>Name: {matchedDog.name}</p>  
                                <p>Breed: {matchedDog.breed}</p>
                                <p>Age: {matchedDog.age}</p>
                                <p>Location: {matchedDog.zip_code}</p>
                            </Container>
                        </Alert>
                    )}

                    {/* Search Results */}
                    <div className="results-grid">
                        {dogs.map(dog => (
                            <Card className="card-dog" key={dog.id}>
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
                        ))}
                    </div>

                    {/* Pagination */}
                    {(nextPage || prevPage) && (
                        <div className="pagination-container">
                            <Button
                                variant="outline-primary"
                                onClick={() => handleSearch(prevPage)}
                                disabled={!prevPage || loading}
                                className="me-2"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() => handleSearch(nextPage)}
                                disabled={!nextPage || loading}
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    {/* Results Count */}
                    {totalResults > 0 && (
                        <div className="results-count">
                            <p>Showing {dogs.length} of {totalResults} results</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
} 