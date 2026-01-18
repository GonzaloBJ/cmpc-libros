import type { Libro } from '../types/libros.type';

type Props = {
    libros: Libro[];
};

export function LibrosTable({ libros }: Props) {
    return (
        <>
            <h2>Libros</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>ID Autor</th>
                        <th>ID Editorial</th>
                        <th>ID Género Literario</th>
                        <th>Vigente</th>
                    </tr>
                </thead>
                <tbody>
                    {libros.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.titulo}</td>
                            <td>{u.idAutor}</td>
                            <td>{u.idEditorial}</td>
                            <td>{u.idGeneroLiterario}</td>
                            <td>{u.vigente}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
