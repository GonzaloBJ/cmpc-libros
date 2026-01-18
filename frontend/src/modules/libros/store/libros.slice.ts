import { createSlice } from '@reduxjs/toolkit';
import type { Libro } from '../types/libros.type';
import { createLibroThunk, fetchLibros } from './libros.thunks';

type LibrosState = {
    items: Libro[];
    loading: boolean;
    error: string | null;
};

const initialState: LibrosState = {
    items: [],
    loading: false,
    error: null,
};

const librosSlice = createSlice({
    name: 'libros',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(fetchLibros.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLibros.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchLibros.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'error innesperado';
            })

            // POST
            .addCase(createLibroThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLibroThunk.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
                state.loading = false;
            })
            .addCase(createLibroThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error creando libro';
            });
    },
});

export const librosReducer = librosSlice.reducer;
