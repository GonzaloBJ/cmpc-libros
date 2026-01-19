import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
} from 'sequelize-typescript';
import { LibroEntity } from './libro.entity';

@Table({ tableName: 'generos_literarios', timestamps: false })
export class GeneroLiterarioEntity extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    nombre: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    vigente: boolean;

    @HasMany(() => LibroEntity)
    libros: LibroEntity[];
}