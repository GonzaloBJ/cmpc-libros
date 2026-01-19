import type { Libro } from '../types/libros.type';
import type { PaginatedResult } from '../types/paginated-result';

type Props = {
    libros: PaginatedResult<Libro>;
    page: number;
    setPage: (page: number | ((prevPage: number) => number)) => void;
};

export function LibrosTable({ libros, page, setPage }: Props) {
    return (
        <>
            <h2>Libros</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Editorial</th>
                        <th>Género Literario</th>
                        <th>Vigente</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.data.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.titulo}</td>
                            <td>{u.autor.nombre}</td>
                            <td>{u.editorial.nombre}</td>
                            <td>{u.generoLiterario.nombre}</td>
                            <td>{u.vigente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
            >
                Anterior
            </button>

            <button
                onClick={() => setPage((p) => p + 1)}
            >
                Siguiente
            </button>
        </>
    );
}
