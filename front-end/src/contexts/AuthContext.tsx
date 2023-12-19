import { useEffect } from 'react'
import { createContext, ReactNode, useState } from 'react'

type Props = {
    children?: ReactNode;
}

interface IUser {
    id: string
    email: string
    name: string
    role: {
        name: string
    }
}

type IAuthContext = {
    authenticated: boolean;
    setAuthenticated: (newState: boolean) => void
    user: IUser | null
}

const initialValue = {
    authenticated: false,
    setAuthenticated: () => {},
    user: null
}

const AuthContext = createContext<IAuthContext>(initialValue)

const AuthProvider = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState(initialValue.authenticated)
    const [user, setUser] = useState<IUser | null>(null)

    useEffect(() => {
        const user = localStorage.getItem('USER')
        const token = localStorage.getItem('ACCESS_TOKEN')
        if (user && token) {
            const loggedUser = JSON.parse(user)
            setUser(loggedUser)
            setAuthenticated(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, user }}>
            { children }
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider }