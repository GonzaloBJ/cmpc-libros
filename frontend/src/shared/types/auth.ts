export interface User {
    email: string;
    accessToken: string;
}
    
export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string; 
}