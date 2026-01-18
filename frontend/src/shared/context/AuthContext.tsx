import { createContext, useContext, useState, type ReactNode } from 'react';
import type { AuthContextType, LoginCredentials, User } from '../types/auth';
import { httpClient } from '../services/http-client';


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async (credentials: LoginCredentials) => {
        setIsLoading(true);
        try {
            const response = await httpClient.post<User>('auth/login', credentials);

            const userAuthData = response.data;

            setUser(userAuthData);

            localStorage.setItem('access_token', userAuthData.accessToken);
        } catch (error) {
            console.error("Error en login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('access_token');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
};