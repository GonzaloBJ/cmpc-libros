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

  static toPersistence(domain: Libro): LibroEntity {
    let libroEntity = new LibroEntity();
    libroEntity.id = domain.id;
    libroEntity.titulo = domain.titulo;
    libroEntity.id_autor = domain.idAutor;
    libroEntity.id_editorial = domain.idEditorial;
    libroEntity.id_genero_literario = domain.idGeneroLiterario;
    libroEntity.vigente = domain.vigente;
    return libroEntity;
  }
}