import { Libro } from "../../domain/models/libro.model";
import { StockLibros } from "../../domain/models/stock-libros.model";
import { CreateStockLibroDto } from "../DTOs/create.stock-libro.dto";
import { UpdateStockLibroDto } from "../DTOs/update.stock-libro.dto";
export class StockLibrosApplicationMapper {

    static fromCreateDtoToDomain(dto: CreateStockLibroDto): StockLibros {
        return new StockLibros(
            null!,
            new Libro(dto.id_libro, '', null!, null!, null!, true),
            dto.precio,
            dto.disponibles,
            new Date(dto.fecha_registro),
            true,
        );
    }
    static fromUpdateDtoToDomain(dto: UpdateStockLibroDto): StockLibros {
        return new StockLibros(
            null!,
            new Libro(dto.id_libro??null!, '', null!, null!, null!, true),
            dto.precio??null!,
            dto.disponibles??null!,
            dto.fecha_registro?new Date(dto.fecha_registro):null!,
            dto.vigente??null!,
        );
    }
}