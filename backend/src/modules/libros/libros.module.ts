import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LibroEntity } from './infrastructure/persistence/sequelize/entities/libro.entity';
import { LibrosController } from './presentation/controllers/libros.controller';
import { LibrosCRUDLService } from './application/use-case/libros.crudl.service';
import { LibroSequelizeRepository } from './infrastructure/persistence/sequelize/adapters/libro.sequelize.repository';
import { LIBRO_REPOSITORY } from './domain/repositories/libro.repository.token';
import { AutorEntity } from './infrastructure/persistence/sequelize/entities/autor.entity';
import { EditorialEntity } from './infrastructure/persistence/sequelize/entities/editorial.entity';
import { GeneroLiterarioEntity } from './infrastructure/persistence/sequelize/entities/genero-literario.entity';

@Module({
    imports: [SequelizeModule.forFeature([
        LibroEntity,
        AutorEntity,
        EditorialEntity,
        GeneroLiterarioEntity
    ])],
    controllers: [LibrosController],
    providers: [
        LibrosCRUDLService,
        {
            provide: LIBRO_REPOSITORY,
            useClass: LibroSequelizeRepository,
        },
    ],
})
export class LibrosModule { }
