import { useEffect, useState } from 'react';
import { LibrosTable } from '../components/LibrosTable';
import { useLibros } from '../hooks/libros.hook';

export function LibrosPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { libros, loading, error, fetchLibros } = useLibros();

  useEffect(() => {
    fetchLibros({ page, limit });
  }, [page, limit]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <LibrosTable libros={libros} page={page} setPage={setPage} />
    </>
  );
}

