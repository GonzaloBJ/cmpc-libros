import React, { useState } from 'react';
import { useAuth } from '../../../shared/context/AuthContext';

const LoginPage = () => {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login({ email, password: password });
    };

    return (
        <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2>Login</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Entrar'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;