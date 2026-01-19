import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AutorEntity } from '../entities/autor.entity';
import { GeneroLiterarioEntity } from '../entities/genero-literario.entity';
import { EditorialEntity } from '../entities/editorial.entity';
import { PaginatedResult } from 'src/modules/libros/application/DTOs/paginated-result.dto';
import { StockLibrosEntity } from '../entities/stock-libros.entity';
import { IStockLibrosRepository } from 'src/modules/libros/domain/repositories/stock-libros.repository.interface';
import { StockLibros } from 'src/modules/libros/domain/models/stock-libros.model';
import { LibroEntity } from '../entities/libro.entity';
import { StockLibrosMapper } from '../../../mappers/stock-libros.mapper';


@Injectable()
export class StockLibrosSequelizeRepository implements IStockLibrosRepository {

    constructor(
        @InjectModel(StockLibrosEntity)
        private readonly stockLibrosModel: typeof StockLibrosEntity,
    ) { }

    async findAll(): Promise<StockLibros[]> {
        const stockLibros = await this.stockLibrosModel.findAll({
            include: [
                { model: LibroEntity },
            ],
        });

        return stockLibros.map(StockLibrosMapper.toDomain);
    }

    async findByIdLibro(id: number): Promise<StockLibros | null> {

        const entity = await this.stockLibrosModel.findOne({
            where: { id_libro: id, vigente: true },
            include: [
                { model: LibroEntity },
            ],
        });
        if (!entity) return null;

        return StockLibrosMapper.toDomain(entity);
    }

    async findAllPaginated(
        page: number,
        limit: number,
    ): Promise<PaginatedResult<StockLibros>> {
        const offset = (page - 1) * limit;

        const { rows, count } = await this.stockLibrosModel.findAndCountAll({
            limit,
            offset,
            distinct: true,
            col: 'id',
            include: [
                { model: LibroEntity },
            ],
            order: [['id', 'ASC']],
        });
        console.log('rows:', rows, 'count:', count);

        return {
            data: rows.map(StockLibrosMapper.toDomain),
            page,
            limit,
            total: count,
            totalPages: Math.ceil(count / limit),
        };
    }

    async create(stockLibros: StockLibros): Promise<StockLibros> {
        const rawData = StockLibrosMapper.toPersistence(stockLibros);
        const created = await this.stockLibrosModel.create(rawData);

        const withRelations = await this.stockLibrosModel.findByPk(created.id, {
            include: [LibroEntity]
        });

        return StockLibrosMapper.toDomain(withRelations!);
    }

    async update(id: number, data: StockLibros): Promise<StockLibros | null> {
        const entity = await this.stockLibrosModel.findByPk(id);
        if (!entity) return null;

        let raw = {};

        if (data.precio !== null && data.precio !== undefined)
            raw = { ...raw, precio: data.precio };
        if (data.vigente !== null && data.vigente !== undefined)
            raw = { ...raw, vigente: data.vigente };
        if (data.disponibles !== null && data.disponibles !== undefined)
            raw = { ...raw, disponibles: data.disponibles };
        if (data.fechaRegistro !== null && data.fechaRegistro !== undefined)
            raw = { ...raw, fecha_registro: data.fechaRegistro };
        if (data.libro.id !== null && data.libro.id !== undefined)
            raw = { ...raw, id_libro: data.libro.id };

        await entity.update(
            raw,
            { where: { id: id } },
        );

        const updated = await this.stockLibrosModel.findByPk(id, {
            include: [AutorEntity, EditorialEntity, GeneroLiterarioEntity],
        });

        if (!updated) {
            throw new NotFoundException('Stock de libros no encontrado');
        }

        return StockLibrosMapper.toDomain(updated);
    }

    async delete(id: number): Promise<{ deletedId: number; }[]> {
        const destroyedId = await this.stockLibrosModel.destroy({ where: { id } });

        return [{ deletedId: destroyedId }];
    }

    async softDelete(id: number): Promise<{ deletedId: number; }[]> {
        const entity = await this.stockLibrosModel.findByPk(id);
        if (!entity) return [{ deletedId: 0 }];

        const updated = await entity.update({ vigente: false });
        const destroyedId = updated.id;

        return [{ deletedId: destroyedId }];
    }
}
