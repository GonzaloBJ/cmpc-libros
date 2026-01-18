import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Libro } from '../types/libros.type';
import { createLibro, getLibros } from '../services/libros.service';

type CreateLibroPayload = {
    titulo: string,
    idAutor: number,
    idEditorial: number,
    idGeneroLiterario: number,
    vigente: boolean,
};

export const fetchLibros = createAsyncThunk<
    Libro[],
    void,
    { rejectValue: string }
>(
    'libros/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await getLibros();
        } catch (err: any) {
            return rejectWithValue(err.message ?? 'Error cangando libros');
        }
    }
);

export const createLibroThunk = createAsyncThunk<
    Libro,
    CreateLibroPayload,
    { rejectValue: string }
>(
    'libros/create',
    async (payload: CreateLibroPayload, { rejectWithValue }) => {
        try {
            return await createLibro(payload);
        } catch (err: any) {
            return rejectWithValue(err.message ?? 'Error creando libro');
        }
    }
);