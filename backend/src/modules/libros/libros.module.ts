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
import { StockLibrosEntity } from './infrastructure/persistence/sequelize/entities/stock-libros.entity';
import { StockLibrosCRUDLService } from './application/use-case/stock-libros.crudl.service';
import { STOCK_LIBROS_REPOSITORY } from './domain/repositories/stock-libros.repository.token';
import { StockLibrosSequelizeRepository } from './infrastructure/persistence/sequelize/adapters/stock-libros.sequelize.repository';
import { StockLibrosController } from './presentation/controllers/stock-libros.controller';

@Module({
    imports: [SequelizeModule.forFeature([
        LibroEntity,
        AutorEntity,
        EditorialEntity,
        GeneroLiterarioEntity,
        StockLibrosEntity
    ])],
    controllers: [LibrosController, StockLibrosController],
    providers: [
        LibrosCRUDLService,
        {
            provide: LIBRO_REPOSITORY,
            useClass: LibroSequelizeRepository,
        },
        StockLibrosCRUDLService,
        {
            provide: STOCK_LIBROS_REPOSITORY,
            useClass: StockLibrosSequelizeRepository,
        },
    ],
})
export class LibrosModule { }
