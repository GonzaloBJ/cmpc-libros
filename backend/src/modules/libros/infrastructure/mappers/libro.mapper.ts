import { Libro } from '../../domain/models/libro.model';
import { LibroEntity } from '../persistence/sequelize/entities/libro.entity';

export class LibroMapper {
  static toDomain(entity: LibroEntity): Libro {
    return new Libro(
      entity.dataValues.id,
      entity.dataValues.titulo,
      entity.dataValues.id_autor,
      entity.dataValues.id_editorial,
      entity.dataValues.id_genero_literario,
      entity.dataValues.vigente,
    );
  }

  static toPersistence(domain: Libro): any {
    return {
      ID: domain.id,
      titulo: domain.titulo,
      id_autor: domain.idAutor,
      id_editorial: domain.idEditorial,
      id_genero_literario: domain.idGeneroLiterario,
      vigente: domain.vigente,
    };
  }
}