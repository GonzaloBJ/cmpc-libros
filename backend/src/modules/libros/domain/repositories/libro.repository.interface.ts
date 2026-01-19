import { PaginatedResult } from "../../application/DTOs/paginated-result.dto";
import { Libro } from "../models/libro.model";

export interface ILibroRepository {
    findAll(): Promise<Libro[]>;
    findById(id: number): Promise<Libro | null>;
    findAllPaginated(page: number, limit: number): Promise<PaginatedResult<Libro>>;
    create(data: Libro): Promise<Libro>;
    update(id: number, data: Libro): Promise<Libro | null>;
    delete(id: number): Promise<{ deletedId: number }[]>;
    softDelete(id: number): Promise<{ deletedId: number }[]>;
}
