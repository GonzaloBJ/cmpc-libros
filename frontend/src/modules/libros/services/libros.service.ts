import { httpClient } from '../../../shared/services/http-client';
import type { CreateLibroDto } from '../types/create.libro.type';
import type { Libro } from '../types/libros.type';
import type { PaginatedResult } from '../types/paginated-result';

// type CreateLibroDto = Omit<
//     Libro,
//     'id' | 'createdAt' | 'updatedAt'
// >;

export async function getLibrosPaginated(page: number, limit: number): Promise<PaginatedResult<Libro>> {
    const response = await httpClient.get<PaginatedResult<Libro>>(`/libros/paginated?page=${page}&limit=${limit}`);
    return response.data;
}

export async function getLibroById(id: number): Promise<Libro> {
    const response = await httpClient.get<Libro>(`/libros/${id}`);
    return response.data;
}

export async function createLibro(
    payload: CreateLibroDto
): Promise<Libro> {
    const response = await httpClient.post<Libro>('/libros', payload);
    return response.data;
}

export async function updateLibro(
    id: number,
    payload: Partial<CreateLibroDto>
): Promise<Libro> {
    const response = await httpClient.patch<Libro>(`/libros/${id}`, payload);
    return response.data;
}