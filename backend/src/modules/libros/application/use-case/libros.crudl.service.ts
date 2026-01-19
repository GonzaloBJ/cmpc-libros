import { Inject, Injectable } from "@nestjs/common";
import { LibroApplicationMapper } from "../mappers/libro.dto.mapper";
import { Libro } from "../../domain/models/libro.model";
import * as libroRepositoryInterface from "../../domain/repositories/libro.repository.interface";
import { LIBRO_REPOSITORY } from "../../domain/repositories/libro.repository.token";
import { CreateLibroDto } from "../DTOs/create.libro.dto";
import { UpdateLibroDto } from "../DTOs/update.libro.dto";


@Injectable()
export class LibrosCRUDLService {
    constructor(
        @Inject(LIBRO_REPOSITORY)
        private readonly libroRepository: libroRepositoryInterface.ILibroRepository) { }

    getLibros() {
        return this.libroRepository.findAll();
    }

    getLibroById(id: number): Promise<Libro | null> {
        return this.libroRepository.findById(id);
    }

    createLibro(dto: CreateLibroDto): Promise<Libro> {
        const libro: Libro = LibroApplicationMapper.fromCreateDtoToDomain(dto);
        return this.libroRepository.create(libro);
    }

    deleteLibro(id: number): Promise<{ deletedId: number }[]> {
        return this.libroRepository.softDelete(id);
    }

    updateLibro(id: number, dto: UpdateLibroDto): Promise<Libro | null> {
        const libro: Libro = LibroApplicationMapper.fromUpdateDtoToDomain(dto);
        return this.libroRepository.update(id, libro);
    }
}