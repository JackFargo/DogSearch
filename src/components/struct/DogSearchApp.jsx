import React from 'react';
import { SecretDogModeProvider } from '../../context/SecretDogModeContext';
import DogSearchAppContent from './DogSearchAppContent';

function DogSearchApp() {
    return (
        <SecretDogModeProvider>
            <DogSearchAppContent />
        </SecretDogModeProvider>
    );
}

export default DogSearchApp;