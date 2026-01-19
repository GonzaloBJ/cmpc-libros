import { Inject, Injectable } from "@nestjs/common";
import { STOCK_LIBROS_REPOSITORY } from "../../domain/repositories/stock-libros.repository.token";
import * as stockLibrosRepositoryInterface from "../../domain/repositories/stock-libros.repository.interface";
import { StockLibros } from "../../domain/models/stock-libros.model";
import { StockLibrosApplicationMapper } from "../mappers/stock-libros.dto.mapper";
import { CreateStockLibroDto } from "../DTOs/create.stock-libro.dto";
import { UpdateStockLibroDto } from "../DTOs/update.stock-libro.dto";


@Injectable()
export class StockLibrosCRUDLService {
    constructor(
        @Inject(STOCK_LIBROS_REPOSITORY)
        private readonly stockLibrosRepository: stockLibrosRepositoryInterface.IStockLibrosRepository) { }

    getStockLibros() {
        return this.stockLibrosRepository.findAll();
    }

    getStockLibroByIdLibro(id: number): Promise<StockLibros | null> {
        return this.stockLibrosRepository.findByIdLibro(id);
    }

    getStockLibrosPaginated(page: number, limit: number) {
        console.log('Service ');
        return this.stockLibrosRepository.findAllPaginated(page, limit);
    }

    createStockLibro(dto: CreateStockLibroDto): Promise<StockLibros> {
        const stockLibros: StockLibros = StockLibrosApplicationMapper.fromCreateDtoToDomain(dto);
        return this.stockLibrosRepository.create(stockLibros);
    }

    deleteStockLibro(id: number): Promise<{ deletedId: number }[]> {
        return this.stockLibrosRepository.softDelete(id);
    }

    updateStockLibro(id: number, dto: UpdateStockLibroDto): Promise<StockLibros | null> {
        const stockLibros: StockLibros = StockLibrosApplicationMapper.fromUpdateDtoToDomain(dto);
        return this.stockLibrosRepository.update(id, stockLibros);
    }
}