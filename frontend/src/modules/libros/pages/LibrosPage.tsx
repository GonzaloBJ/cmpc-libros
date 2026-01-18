import { useEffect } from 'react';
import { LibrosTable } from '../components/LibrosTable';
import { fetchLibros } from '../store/libros.thunks';
import { useLibros } from '../hooks/libros.hook';

export function LibrosPage() {
  const { libros, loading, error, createLibro } = useLibros();

  useEffect(() => {
    fetchLibros();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <LibrosTable libros={libros} />
    </>
  );
}

