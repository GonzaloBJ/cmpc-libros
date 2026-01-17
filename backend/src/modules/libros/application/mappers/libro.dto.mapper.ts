import { Libro } from "../../domain/models/libro.model";
import { LibroDTO } from "../DTOs/libro.dto";

export class LibroApplicationMapper {
    static fromDtoToDomain(dto: LibroDTO): Libro {
        return new Libro(
            null!,
            dto.titulo,
            dto.id_autor,
            dto.id_editorial,
            dto.id_genero_literario,
            true,
        );
    }
}