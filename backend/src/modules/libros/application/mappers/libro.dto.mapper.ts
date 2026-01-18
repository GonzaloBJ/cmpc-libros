import { Libro } from "../../domain/models/libro.model";
import { CreateLibroDto } from "../DTOs/create.libro.dto";
import { UpdateLibroDto } from "../DTOs/update.libro.dto";

export class LibroApplicationMapper {

    static fromCreateDtoToDomain(dto: CreateLibroDto): Libro {
        return new Libro(
            null!,
            dto.titulo,
            dto.id_autor,
            dto.id_editorial,
            dto.id_genero_literario,
            true,
        );
    }
    static fromUpdateDtoToDomain(dto: UpdateLibroDto): Partial<Libro> {
        const libro: Partial<Libro> = {};

        if (dto.titulo !== undefined) {
            libro.titulo = dto.titulo;
        }
        if (dto.id_autor !== undefined) {
            libro.idAutor = dto.id_autor;
        }
        if (dto.id_editorial !== undefined) {
            libro.idEditorial = dto.id_editorial;
        }
        if (dto.id_genero_literario !== undefined) {
            libro.idGeneroLiterario = dto.id_genero_literario;
        }
        if (dto.vigente !== undefined) {
            libro.vigente = dto.vigente;
        }
        return libro;
    }
}