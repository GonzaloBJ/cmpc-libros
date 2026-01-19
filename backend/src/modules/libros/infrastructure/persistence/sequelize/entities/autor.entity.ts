import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { LibroEntity } from './libro.entity';

@Table({ tableName: 'autores', timestamps: false })
export class AutorEntity extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    nombre: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    vigente: boolean;

    @HasMany(() => LibroEntity)
    libros: LibroEntity[];
}