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
  ) {}
  
  async findAll(): Promise<Libro[]> {
    const rows = await this.libroModel.findAll();
    console.log(this.libroModel.options);

    console.log('DATO ENTITY:', rows[0]);

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

  update(id: number, data: Partial<Libro>): Promise<Libro | null> {
    throw new Error('Method not implemented.');
  }

  delete(id: number): Promise<{ deletedId: number; }[]> {
    throw new Error('Method not implemented.');
  }
}
