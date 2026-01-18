import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LibroEntity } from '../entities/libro.entity';
import { ILibroRepository } from 'src/modules/libros/domain/repositories/libro.repository.interface';
import { Libro } from 'src/modules/libros/domain/models/libro.model';
import { LibroMapper } from '../../../mappers/libro.mapper';


@Injectable()
export class LibroSequelizeRepository implements ILibroRepository {

    constructor(
        @InjectModel(LibroEntity)
        private readonly libroModel: typeof LibroEntity,
    ) { }

    async findAll(): Promise<Libro[]> {
        const rows = await this.libroModel.findAll();

        return rows.map(LibroMapper.toDomain);
    }

    async findById(id: number): Promise<Libro | null> {
        const entity = await this.libroModel.findByPk(id);
        if (!entity) return null;

        return LibroMapper.toDomain(entity);
    }

    async create(libro: Libro): Promise<Libro> {
        const rawData = LibroMapper.toPersistence(libro);
        const created = await this.libroModel.create(rawData);

        return LibroMapper.toDomain(created);
    }

    async update(id: number, data: Partial<Libro>): Promise<Libro | null> {
        const entity = await this.libroModel.findByPk(id);
        if (!entity) return null;

        const updated = await entity.update(data);

        return LibroMapper.toDomain(updated);
    }

    async delete(id: number): Promise<{ deletedId: number; }[]> {
        const destroyedId = await this.libroModel.destroy({ where: { id } });

        return [{ deletedId: destroyedId }];
    }

    async softDelete(id: number): Promise<{ deletedId: number; }[]> {
        const entity = await this.libroModel.findByPk(id);
        if (!entity) return [{ deletedId: 0 }];

        const updated = await entity.update({ vigente: false });
        const destroyedId = updated.id;

        return [{ deletedId: destroyedId }];
    }
}
