import React, { createContext, useState } from 'react'
import { ReactNode } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({children}: any) => {

    const [auth, setAuth] = useState(false)

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider