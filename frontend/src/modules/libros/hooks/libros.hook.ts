import { useDispatch, useSelector } from 'react-redux';
import { createLibroThunk, fetchLibrosThunk } from '../store/libros.thunks';
import type { AppDispatch, RootState } from '../../../storage';


type CreateLibroInput = {
    titulo: string;
    idAutor: number;
    idEditorial: number;
    idGeneroLiterario: number;
    vigente: boolean;
};


export function useLibros() {
    const dispatch = useDispatch<AppDispatch>();

    const { items, loading, error } = useSelector(
        (state: RootState) => state.libros
    );


    const fetchLibros = (params: { page: number; limit: number }) => {
        dispatch(fetchLibrosThunk(params));
    };

    const createLibro = (data: CreateLibroInput) => {
        dispatch(createLibroThunk(data));
    };

    return {
        libros: items,
        loading,
        error,
        fetchLibros,
        createLibro,
    };
}
