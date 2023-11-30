import React, { createContext, useEffect, useState } from 'react'
import { ReactNode } from 'react';

export const AuthContext = createContext({});

const AuthProvider = ({children}:{ children: ReactNode }) => {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const localUser = localStorage.getItem('USER');
        const localToken = localStorage.getItem('ACCESS_TOKEN');

        if(localUser && localToken) {
            console.log(JSON.parse(localUser))
            setUser(JSON.parse(localUser))
        }
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider