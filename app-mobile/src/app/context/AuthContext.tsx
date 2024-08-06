import {Children, createContext, ReactNode, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ApiException } from '../services/api/ApiException';
import { Api } from '../services/api/ApiConfig';

interface ILogin {
    email: string;
    password: string;
}

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null }
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (credentials: ILogin) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://localhost:3000';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ token: string | null, authenticated: boolean | null }>({
        token: null,
        authenticated: null
    })

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
    
            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                
                setAuthState({
                    token: token,
                    authenticated: true
                })
            }
        }
        loadToken();
    }, [])

    const login = async (credentials: ILogin) : Promise<any | ApiException> => {
        try {
            const { data } = await Api({ token: null }).post(`/login`, credentials)
            
            console.log("data>>>>", data)
            setAuthState({
                token: data.token,
                authenticated: true
            })

            console.log("data>>>>", data)

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, data.token)

            return data
        } catch (error: any) {
            return new ApiException(error.message || 'Usuário ou Senha Incorreto!')
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false
        })
    }
    

    const value: AuthProps = {
        onLogin: login,
        onLogout: logout,
        authState: authState
    };
    
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
