import { Autor } from '../../domain/models/autor.model';
import { Editorial } from '../../domain/models/editorial.model';
import { GeneroLiterario } from '../../domain/models/genero-literario.model';
import { Libro } from '../../domain/models/libro.model';
import { StockLibros } from '../../domain/models/stock-libros.model';
import { StockLibrosEntity } from '../persistence/sequelize/entities/stock-libros.entity';


export class StockLibrosMapper {

    static toDomain(model: StockLibrosEntity): StockLibros {
        const autor = new Autor(model.dataValues.libro.dataValues.id_autor, '', true);
        const editorial = new Editorial(model.dataValues.libro.dataValues.id_editorial, '', true);
        const generoLiterario = new GeneroLiterario(model.dataValues.libro.dataValues.id_genero_literario, '', true);

        return new StockLibros(
            model.dataValues.id,
            new Libro(
                model.dataValues.libro.dataValues.id,
                model.dataValues.libro.dataValues.titulo,
                autor,
                editorial,
                generoLiterario,
                model.dataValues.libro.vigente
            ),
            model.dataValues.precio,
            model.dataValues.disponibles,
            model.dataValues.fecha_registro,
            model.dataValues.vigente,
        );
    }

    static toPersistence(domain: StockLibros): StockLibrosEntity {
        let entity = new StockLibrosEntity();
        entity.id = domain.id;
        entity.id_libro = domain.libro.id;
        entity.precio = domain.precio;
        entity.disponibles = domain.disponibles;
        entity.fecha_registro = domain.fechaRegistro;
        entity.vigente = domain.vigente;
        return entity;
    }
}