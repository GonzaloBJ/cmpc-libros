import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LibroEntity } from '../entities/libro.entity';
import { ILibroRepository } from 'src/modules/libros/domain/repositories/libro.repository.interface';
import { Libro } from 'src/modules/libros/domain/models/libro.model';
import { LibroMapper } from '../../../mappers/libro.mapper';
import { AutorEntity } from '../entities/autor.entity';
import { GeneroLiterarioEntity } from '../entities/genero-literario.entity';
import { EditorialEntity } from '../entities/editorial.entity';
import { PaginatedResult } from 'src/modules/libros/application/DTOs/paginated-result.dto';



@Injectable()
export class LibroSequelizeRepository implements ILibroRepository {

    constructor(
        @InjectModel(LibroEntity)
        private readonly libroModel: typeof LibroEntity,
    ) { }

    async findAll(): Promise<Libro[]> {
        const libros = await this.libroModel.findAll({
            include: [
                { model: AutorEntity },
                { model: EditorialEntity },
                { model: GeneroLiterarioEntity },
            ],
        });

        return libros.map(LibroMapper.toDomain);
    }

    async findById(id: number): Promise<Libro | null> {
        const entity = await this.libroModel.findByPk(id, {
            include: [
                { model: AutorEntity },
                { model: EditorialEntity },
                { model: GeneroLiterarioEntity },
            ],
        });
        if (!entity) return null;

        return LibroMapper.toDomain(entity);
    }

    async findAllPaginated(
        page: number,
        limit: number,
    ): Promise<PaginatedResult<Libro>> {
        const offset = (page - 1) * limit;

        const { rows, count } = await this.libroModel.findAndCountAll({
            limit,
            offset,
            distinct: true,
            col: 'id',
            include: [
                { model: AutorEntity },
                { model: EditorialEntity },
                { model: GeneroLiterarioEntity },
            ],
            order: [['id', 'ASC']],
        });

        return {
            data: rows.map(LibroMapper.toDomain),
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit),
        };
    }

    async create(libro: Libro): Promise<Libro> {
        const rawData = LibroMapper.toPersistence(libro);
        const created = await this.libroModel.create(rawData);

        const withRelations = await this.libroModel.findByPk(created.id, {
            include: [AutorEntity, EditorialEntity, GeneroLiterarioEntity],
        });

        return LibroMapper.toDomain(withRelations!);
    }

    async update(id: number, data: Libro): Promise<Libro | null> {
        const entity = await this.libroModel.findByPk(id);
        if (!entity) return null;

        let raw = {};

        if (data.titulo !== null && data.titulo !== undefined)
            raw = { ...raw, titulo: data.titulo };
        if (data.vigente !== null && data.vigente !== undefined)
            raw = { ...raw, vigente: data.vigente };
        if (data.autor?.id !== null && data.autor?.id !== undefined)
            raw = { ...raw, id_autor: data.autor.id };
        if (data.editorial?.id !== null && data.editorial?.id !== undefined)
            raw = { ...raw, id_editorial: data.editorial.id };
        if (data.generoLiterario?.id !== null && data.generoLiterario?.id !== undefined)
            raw = { ...raw, id_genero_literario: data.generoLiterario.id };

        await entity.update(
            raw,
            { where: { id: id } },
        );

        const updated = await this.libroModel.findByPk(id, {
            include: [AutorEntity, EditorialEntity, GeneroLiterarioEntity],
        });

        if (!updated) {
            throw new NotFoundException('Libro no encontrado');
        }

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
