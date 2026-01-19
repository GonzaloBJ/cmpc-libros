import { createSlice } from '@reduxjs/toolkit';
import type { Libro } from '../types/libros.type';
import { createLibroThunk, fetchLibrosThunk } from './libros.thunks';
import type { PaginatedResult } from '../types/paginated-result';

type LibrosState = {
    items: PaginatedResult<Libro>;
    loading: boolean;
    error: string | null;
};

const initialState: LibrosState = {
    items: {
        data: [],
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    },
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
            .addCase(fetchLibrosThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLibrosThunk.fulfilled, (state, action) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchLibrosThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'error innesperado';
            })

            // POST
            .addCase(createLibroThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLibroThunk.fulfilled, (state, action) => {
                state.items.data.unshift(action.payload);
                state.loading = false;
            })
            .addCase(createLibroThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Error creando libro';
            });
    },
});

export const librosReducer = librosSlice.reducer;
