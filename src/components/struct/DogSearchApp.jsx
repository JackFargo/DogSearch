import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import DogSearchLayout from './DogSearchLayout';
import DogSearchLogin from '../auth/DogSearchLogin';
//import DogSearchRegister from '../auth/DogSearchRegister';
import DogSearchLogout from '../auth/DogSearchLogout';
import DogSearchHome from '../content/DogSearchHome';
import DogSearchSearch from '../content/DogSearchSearch';
import DogSearchNoMatch from '../content/DogSearchNoMatch';

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Boolean(sessionStorage.getItem('isLoggedIn'));
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function DogSearchApp() {
    return (
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
    );
}

export default DogSearchApp;