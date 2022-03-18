import React, { useState, useEffect, createContext } from 'react';
import getUser from '../api/user';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({
        "image": {
            "png": "",
            "webp": ""
        },
        "id": '',
        "username": ""
    });

    useEffect(() => {
        getUser().then(user => setCurrentUser(user));
    }, [])

    return (
        <UserContext.Provider value={{currentUser}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserProvider, UserContext}