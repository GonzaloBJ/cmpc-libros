import { LibroDTO } from "../../application/DTOs/libro.dto";

export interface ILibrosRepository {
    findAll(): Promise<LibroDTO[]>;
    findById(id: number): Promise<LibroDTO | null>;
    create(data: LibroDTO): Promise<LibroDTO>;
    update(id: number, data: Partial<LibroDTO>): Promise<LibroDTO | null>;
    delete(id: number): Promise<{ deletedId: number }[]>;
}
    