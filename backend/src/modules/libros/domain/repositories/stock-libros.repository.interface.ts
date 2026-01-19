import { PaginatedResult } from "../../application/DTOs/paginated-result.dto";
import { StockLibros } from "../models/stock-libros.model";

export interface IStockLibrosRepository {
    findAll(): Promise<StockLibros[]>;
    findByIdLibro(id: number): Promise<StockLibros | null>;
    findAllPaginated(page: number, limit: number): Promise<PaginatedResult<StockLibros>>;
    create(data: StockLibros): Promise<StockLibros>;
    update(id: number, data: StockLibros): Promise<StockLibros | null>;
    delete(id: number): Promise<{ deletedId: number }[]>;
    softDelete(id: number): Promise<{ deletedId: number }[]>;
}