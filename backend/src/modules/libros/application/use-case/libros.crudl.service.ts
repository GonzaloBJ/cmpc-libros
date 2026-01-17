import { Inject, Injectable } from "@nestjs/common";
import { LibroDTO } from "../DTOs/libro.dto";
import { LibroApplicationMapper } from "../mappers/libro.dto.mapper";
import { Libro } from "../../domain/models/libro.model";
import * as libroRepositoryInterface from "../../domain/repositories/libro.repository.interface";
import { LIBRO_REPOSITORY } from "../../domain/repositories/libro.repository.token";


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

    createLibro(dto: LibroDTO): Promise<Libro> {
        console.log('DTO RECIBIDO EN SERVICE:', dto);
        const libro: Libro = LibroApplicationMapper.fromDtoToDomain(dto);
        console.log('DOMINIO CREADO EN SERVICE:', libro);
        return this.libroRepository.create(libro);
    }

    deleteLibro(id: number): Promise<{ deletedId: number }[]> {
        return this.libroRepository.delete(id);
    }

    updateLibro(id: number, dto: Partial<LibroDTO>): Promise<Libro | null> {
        return this.libroRepository.update(id, dto);
    }
}