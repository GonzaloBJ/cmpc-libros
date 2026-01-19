import { Autor } from '../../domain/models/autor.model';
import { Editorial } from '../../domain/models/editorial.model';
import { GeneroLiterario } from '../../domain/models/genero-literario.model';
import { Libro } from '../../domain/models/libro.model';
import { LibroEntity } from '../persistence/sequelize/entities/libro.entity';

export class LibroMapper {

    static toDomain(model: LibroEntity): Libro {
        return new Libro(
            model.dataValues.id,
            model.dataValues.titulo,
            new Autor(model.dataValues.autor.dataValues.id, model.dataValues.autor.dataValues.nombre, model.dataValues.autor.dataValues.vigente),
            new Editorial(model.dataValues.editorial.dataValues.id, model.dataValues.editorial.dataValues.nombre, model.dataValues.editorial.dataValues.vigente),
            new GeneroLiterario(model.dataValues.genero_literario.dataValues.id, model.dataValues.genero_literario.dataValues.nombre, model.dataValues.genero_literario.dataValues.vigente),
            model.dataValues.vigente,
        );
    }

    static toPersistence(domain: Libro): LibroEntity {
        let libroEntity = new LibroEntity();
        libroEntity.id = domain.id;
        libroEntity.titulo = domain.titulo;
        libroEntity.id_autor = domain.autor.id;
        libroEntity.id_editorial = domain.editorial.id;
        libroEntity.id_genero_literario = domain.generoLiterario.id;
        libroEntity.vigente = domain.vigente;
        return libroEntity;
    }
}