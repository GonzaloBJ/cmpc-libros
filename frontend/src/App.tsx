import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LibrosPage } from './modules/libros/pages/LibrosPage';
import { useAuth } from './shared/context/AuthContext';
import LoginPage from './modules/login/pages/LoginPage';
import Layout from './shared/layouts/MainLayout';


function App() {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={!user ? <LoginPage /> : <Navigate to="/" />}
                />

                <Route
                    path="/"
                    element={user ? <Layout /> : <Navigate to="/login" />}
                >
                    <Route path="libros" element={<LibrosPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;