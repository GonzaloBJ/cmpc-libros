import { Autor } from "../../domain/models/autor.model";
import { Editorial } from "../../domain/models/editorial.model";
import { GeneroLiterario } from "../../domain/models/genero-literario.model";
import { Libro } from "../../domain/models/libro.model";
import { CreateLibroDto } from "../DTOs/create.libro.dto";
import { UpdateLibroDto } from "../DTOs/update.libro.dto";

export class LibroApplicationMapper {

    static fromCreateDtoToDomain(dto: CreateLibroDto): Libro {
        return new Libro(
            null!,
            dto.titulo,
            new Autor(dto.id_autor, null!, null!),
            new Editorial(dto.id_editorial, null!, null!),
            new GeneroLiterario(dto.id_genero_literario, null!, null!),
            true,
        );
    }
    static fromUpdateDtoToDomain(dto: UpdateLibroDto): Libro {
        return new Libro(
            null!,
            dto.titulo??null!,
            new Autor(dto.id_autor??null!, null!, null!),
            new Editorial(dto.id_editorial??null!, null!, null!),
            new GeneroLiterario(dto.id_genero_literario??null!, null!, null!),
            dto.vigente??null!,
        );
    }
}