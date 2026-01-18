import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
    const { logout } = useAuth();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside style={{ width: '200px', background: '#eee', padding: '1rem' }}>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><Link to="/">Inicio</Link></li>
                        <li><Link to="/libros">Libros</Link></li>

                    </ul>
                </nav>
                <button onClick={logout}>Cerrar sesión</button>
            </aside>

            <main style={{ flex: 1, padding: '2rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;