import { httpClient } from '../../../shared/services/http-client';
import type { Libro } from '../types/libros.type';

type CreateLibroDto = Omit<
    Libro,
    'id' | 'createdAt' | 'updatedAt'
>;

export async function getLibros(): Promise<Libro[]> {
    const response = await httpClient.get<Libro[]>('/libros');
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