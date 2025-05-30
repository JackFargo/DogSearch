import React, { useState, useEffect, useCallback } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import { useSecretDogMode } from '../../context/SecretDogModeContext';
import './DogSearchSearch.css';

// API endpoints
const API_BASE_URL = 'https://frontend-take-home-service.fetch.com';
const API_ENDPOINTS = {
  SEARCH: `${API_BASE_URL}/dogs/search`,
  BREEDS: `${API_BASE_URL}/dogs/breeds`,
  DOGS: `${API_BASE_URL}/dogs`,
  MATCH: `${API_BASE_URL}/dogs/match`,
};

export default function DogSearchSearch() {
    const { secretDogMode } = useSecretDogMode();
    
    // State management
    const [searchState, setSearchState] = useState({
        breeds: [],
        selectedBreeds: [],
        searchTerm: '',
        ageMin: '',
        ageMax: '',
        sortField: 'breed',
        sortDirection: 'asc',
        dogs: [],
        loading: false,
        error: '',
        totalResults: 0,
        nextPage: null,
        prevPage: null,
        matchedDog: null,
        matching: false,
    });

    // Memoized filter function
    const filteredBreeds = useCallback(() => {
        return searchState.breeds.filter(breed => 
            breed.toLowerCase().includes(searchState.searchTerm.toLowerCase())
        );
    }, [searchState.breeds, searchState.searchTerm]);

    // API calls
    const fetchBreeds = useCallback(async () => {
        try {
            const response = await fetch(API_ENDPOINTS.BREEDS, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setSearchState(prev => ({ ...prev, breeds: data }));
            } else {
                setSearchState(prev => ({ ...prev, error: 'Failed to fetch breeds' }));
            }
        } catch (err) {
            setSearchState(prev => ({ ...prev, error: 'Error fetching breeds' }));
        }
    }, []);

    const handleSearch = useCallback(async (pageQuery = '') => {
        try {
            setSearchState(prev => ({ 
                ...prev, 
                loading: true, 
                error: '',
                matchedDog: null 
            }));

            const queryParams = new URLSearchParams();
            
            if (searchState.selectedBreeds.length > 0) {
                searchState.selectedBreeds.forEach(breed => 
                    queryParams.append('breeds', breed)
                );
            }
            
            if (searchState.ageMin) queryParams.append('ageMin', searchState.ageMin);
            if (searchState.ageMax) queryParams.append('ageMax', searchState.ageMax);
            
            queryParams.append('sort', `${searchState.sortField}:${searchState.sortDirection}`);
            
            if (pageQuery) {
                const pageNumber = pageQuery.split('from=')[1]?.split('&')[0] || pageQuery;
                queryParams.append('from', pageNumber);
            }
            
            queryParams.append('size', '16');

            const response = await fetch(
                `${API_ENDPOINTS.SEARCH}?${queryParams.toString()}`,
                { credentials: 'include' }
            );
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            
            if (data.resultIds.length > 0) {
                const dogsResponse = await fetch(API_ENDPOINTS.DOGS, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(data.resultIds)
                });

                if (!dogsResponse.ok) throw new Error(`HTTP error! status: ${dogsResponse.status}`);

                const dogsData = await dogsResponse.json();
                setSearchState(prev => ({
                    ...prev,
                    dogs: dogsData,
                    totalResults: data.total,
                    nextPage: data.next,
                    prevPage: data.prev,
                }));
            } else {
                setSearchState(prev => ({
                    ...prev,
                    dogs: [],
                    totalResults: 0,
                    nextPage: null,
                    prevPage: null,
                }));
            }
        } catch (err) {
            setSearchState(prev => ({
                ...prev,
                error: `Error searching dogs: ${err.message}`,
                dogs: [],
                totalResults: 0,
                nextPage: null,
                prevPage: null,
            }));
        } finally {
            setSearchState(prev => ({ ...prev, loading: false }));
        }
    }, [searchState.selectedBreeds, searchState.ageMin, searchState.ageMax, 
        searchState.sortField, searchState.sortDirection]);

    const handleMatch = useCallback(async () => {
        if (searchState.dogs.length === 0) return;

        try {
            setSearchState(prev => ({ ...prev, matching: true }));
            
            const response = await fetch(API_ENDPOINTS.MATCH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(searchState.dogs.map(dog => dog.id))
            });

            if (response.ok) {
                const { match } = await response.json();
                const matchedDog = searchState.dogs.find(dog => dog.id === match);
                setSearchState(prev => ({ ...prev, matchedDog }));
            }
        } catch (err) {
            setSearchState(prev => ({ ...prev, error: 'Error finding match' }));
        } finally {
            setSearchState(prev => ({ ...prev, matching: false }));
        }
    }, [searchState.dogs]);

    // Effects
    useEffect(() => {
        fetchBreeds();
        handleSearch();
    }, [fetchBreeds, handleSearch]);

    // Event handlers
    const handleBreedSelection = useCallback((breed, checked) => {
        setSearchState(prev => ({
            ...prev,
            selectedBreeds: checked
                ? [...prev.selectedBreeds, breed]
                : prev.selectedBreeds.filter(b => b !== breed)
        }));
    }, []);

    return (
        <Container fluid className={`mt-4 ${secretDogMode ? 'secret-dog-mode-active' : ''}`} style={{ marginTop: '0.75rem' }}>
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
                                                value={searchState.ageMin}
                                                onChange={(e) => setSearchState(prev => ({ ...prev, ageMin: e.target.value }))}
                                                min="0"
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                type="number"
                                                placeholder="Max"
                                                value={searchState.ageMax}
                                                onChange={(e) => setSearchState(prev => ({ ...prev, ageMax: e.target.value }))}
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
                                                value={searchState.sortField}
                                                onChange={(e) => setSearchState(prev => ({ ...prev, sortField: e.target.value }))}
                                            >
                                                <option value="breed">Breed</option>
                                                <option value="name">Name</option>
                                                <option value="age">Age</option>
                                            </Form.Select>
                                        </Col>
                                        <Col>
                                            <Form.Select
                                                value={searchState.sortDirection}
                                                onChange={(e) => setSearchState(prev => ({ ...prev, sortDirection: e.target.value }))}
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
                                value={searchState.searchTerm}
                                onChange={(e) => setSearchState(prev => ({ ...prev, searchTerm: e.target.value }))}
                            />
                            <div className="breed-list" style={{ 
                                maxHeight: '200px', 
                                overflowY: 'auto',
                                border: '1px solid #ced4da',
                                borderRadius: '0.25rem',
                                padding: '0.75rem'
                            }}>
                                {filteredBreeds().map(breed => (
                                    <Form.Check
                                        key={breed}
                                        type="checkbox"
                                        id={breed}
                                        label={breed}
                                        checked={searchState.selectedBreeds.includes(breed)}
                                        onChange={(e) => handleBreedSelection(breed, e.target.checked)}
                                        className="mb-0"
                                    />
                                ))}
                            </div>
                            {searchState.selectedBreeds.length > 0 && (
                                <div className="selected-breeds mt-2">
                                    <small className="text-muted">Selected breeds: {searchState.selectedBreeds.join(', ')}</small>
                                </div>
                            )}
                        </Form.Group>

                        {/* Action Buttons */}
                        <Button 
                            variant="primary" 
                            onClick={() => handleSearch()} 
                            disabled={searchState.loading}
                            className="w-100 mb-2 search-button"
                        >
                            {searchState.loading ? <Spinner animation="border" size="sm" /> : 'Search'}
                        </Button>

                        <Button 
                            variant="success" 
                            onClick={handleMatch} 
                            disabled={searchState.loading || searchState.matching || searchState.dogs.length === 0}
                            className="w-100 mb-2 match-button"
                        >
                            {searchState.matching ? <Spinner animation="border" size="sm" /> : 'Find Match'}
                        </Button>
                    </Form>
                </Col>

                {/* Right side - Results */}
                <Col md={8}>
                    {searchState.error && <Alert variant="danger">{searchState.error}</Alert>}

                    {/* Match Result */}
                    {searchState.matchedDog && (
                        <Alert variant="success" className="matched-results">
                            <Container className="matched-results-container-img">
                                <Card.Img variant="top" src={searchState.matchedDog.img} />
                            </Container>
                            <Container className="matched-results-container-text">
                                <h4>Your Perfect Match!</h4>
                                <p>Name: {searchState.matchedDog.name}</p>  
                                <p>Breed: {searchState.matchedDog.breed}</p>
                                <p>Age: {searchState.matchedDog.age}</p>
                                <p>Location: {searchState.matchedDog.zip_code}</p>
                            </Container>
                        </Alert>
                    )}

                    {/* Search Results */}
                    <div className="results-grid">
                        {searchState.dogs.map(dog => (
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
                    {(searchState.nextPage || searchState.prevPage) && (
                        <div className="pagination-container">
                            <Button
                                variant="outline-primary"
                                onClick={() => handleSearch(searchState.prevPage)}
                                disabled={!searchState.prevPage || searchState.loading}
                                className="me-2"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline-primary"
                                onClick={() => handleSearch(searchState.nextPage)}
                                disabled={!searchState.nextPage || searchState.loading}
                            >
                                Next
                            </Button>
                        </div>
                    )}

                    {/* Results Count */}
                    {searchState.totalResults > 0 && (
                        <div className="results-count">
                            <p>Page {searchState.prevPage ? Math.floor(parseInt(searchState.prevPage.split('from=')[1]?.split('&')[0]) / 16) + 2 : 1} of {Math.ceil(searchState.totalResults / 16)}</p>
                            <p>Total Results: {searchState.totalResults}</p>
                        </div>
                    )}
                </Col>
            </Row>
        </Container>
    );
} 