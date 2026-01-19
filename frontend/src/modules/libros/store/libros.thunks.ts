import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Libro } from '../types/libros.type';
import { createLibro, getLibrosPaginated } from '../services/libros.service';
import type { PaginatedResult } from '../types/paginated-result';
import type { CreateLibroDto } from '../types/create.libro.type';


type CreateLibroPayload = CreateLibroDto;

type FetchAllLibroPayload = {
    page: number,
    limit: number,
};

export const fetchLibrosThunk = createAsyncThunk<
  PaginatedResult<Libro>,
  FetchAllLibroPayload,
  { rejectValue: string }
>(
  'libros/fetchAll',
  async (payload, { rejectWithValue }) => {
    try {
      return await getLibrosPaginated(payload.page, payload.limit);
    } catch (err: any) {
      return rejectWithValue(err.message ?? 'Error cargando libros');
    }
  }
);

export const createLibroThunk = createAsyncThunk<
    Libro,
    CreateLibroPayload,
    { rejectValue: string }
>(
    'libros/create',
    async (payload, { rejectWithValue }) => {
        try {
            return await createLibro(payload);
        } catch (err: any) {
            return rejectWithValue(err.message ?? 'Error creando libro');
        }
    }
);