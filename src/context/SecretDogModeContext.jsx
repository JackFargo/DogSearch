import React, { createContext, useState, useContext } from 'react';

const SecretDogModeContext = createContext();

export function SecretDogModeProvider({ children }) {
    const [secretDogMode, setSecretDogMode] = useState(false);

    return (
        <SecretDogModeContext.Provider value={{ secretDogMode, setSecretDogMode }}>
            {children}
        </SecretDogModeContext.Provider>
    );
}

export function useSecretDogMode() {
    return useContext(SecretDogModeContext);
}
