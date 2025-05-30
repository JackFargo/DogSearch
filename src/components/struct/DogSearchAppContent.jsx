import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSecretDogMode } from '../../context/SecretDogModeContext';
import DogSearchLayout from './DogSearchLayout';
import DogSearchLogin from '../auth/DogSearchLogin';
import DogSearchLogout from '../auth/DogSearchLogout';
import DogSearchHome from '../content/DogSearchHome';
import DogSearchSearch from '../content/DogSearchSearch';
import DogSearchNoMatch from '../content/DogSearchNoMatch';
import './DogSearchApp.css';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Boolean(sessionStorage.getItem('isLoggedIn'));
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function DogSearchAppContent() {
    const { secretDogMode } = useSecretDogMode();
    const isLoggedIn = Boolean(sessionStorage.getItem('isLoggedIn'));

    // The className is always present at the highest level
    return (
        <div className={`dog-search-app${isLoggedIn && secretDogMode ? ' secret-dog-mode-active' : ''}`}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<DogSearchLayout />}>
                        <Route index element={<DogSearchHome />} />
                        <Route path="/login" element={<DogSearchLogin />} />
                        <Route path="/logout" element={<DogSearchLogout />} />
                        <Route 
                            path="/search" 
                            element={
                                <ProtectedRoute>
                                    <DogSearchSearch />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="*" element={<DogSearchNoMatch />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default DogSearchAppContent;