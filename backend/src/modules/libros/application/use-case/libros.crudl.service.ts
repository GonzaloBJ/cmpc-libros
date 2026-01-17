import { Inject, Injectable } from "@nestjs/common";
import * as librosRepositoryInterface from "../../domain/repositories/libros.repository.interface";
import { LibroDTO } from "../DTOs/libro.dto";

@Injectable()
export class LibrosCRUDLService {
    constructor(
        @Inject('ILibrosRepository')
        private readonly librosRepo: librosRepositoryInterface.ILibrosRepository,
    ) { }

    getLibros() {
        return this.librosRepo.findAll();
    }

    getLibroById(id: number) {
        return this.librosRepo.findById(id);
    }

    createLibro(dto: LibroDTO) {
        return this.librosRepo.create(dto);
    }

    deleteLibro(id: number) {
        return this.librosRepo.delete(id);
    }

    updateLibro(id: number, dto: Partial<LibroDTO>) {
        return this.librosRepo.update(id, dto);
    }
}