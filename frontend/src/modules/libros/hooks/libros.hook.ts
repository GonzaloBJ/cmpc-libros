import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLibroThunk, fetchLibros } from '../store/libros.thunks';
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

    useEffect(() => {
        dispatch(fetchLibros());
    }, [dispatch]);

    const createLibro = (data: CreateLibroInput) => {
        dispatch(createLibroThunk(data));
    };

    return {
        libros: items,
        loading,
        error,
        createLibro,
    };
}
