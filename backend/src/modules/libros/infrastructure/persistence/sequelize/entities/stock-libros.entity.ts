import * as sequelize from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { LibroEntity } from './libro.entity';

@Table({
    tableName: 'stock_libros',
    timestamps: false
})
export class StockLibrosEntity extends Model<
    sequelize.InferAttributes<StockLibrosEntity>,
    sequelize.InferCreationAttributes<StockLibrosEntity>
> {
    @ForeignKey(() => LibroEntity)
    @Column({ field: 'id_libro', type: DataType.INTEGER, allowNull: false })
    id_libro: number;

    @BelongsTo(() => LibroEntity)
    libro: LibroEntity;

    @Column({ field: 'precio', type: DataType.INTEGER, allowNull: false })
    precio: number;

    @Column({ field: 'disponibles', type: DataType.INTEGER, allowNull: false })
    disponibles: number;

    @Column({ field: 'fecha_registro', type: DataType.DATE, allowNull: false })
    fecha_registro: Date;

    @Column({ field: 'vigente', type: DataType.BOOLEAN, allowNull: false })
    vigente: boolean;

}
