import * as sequelize from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement
} from 'sequelize-typescript';

@Table({
  tableName: 'libros',
  timestamps: false
})
export class LibroEntity extends Model<
  sequelize.InferAttributes<LibroEntity>,
  sequelize.InferCreationAttributes<LibroEntity>
> {
  @PrimaryKey
  @AutoIncrement
  @Column({ field: 'id', type: DataType.INTEGER })
  declare id: sequelize.CreationOptional<number>;

  @Column({ type: DataType.STRING(150), allowNull: false })
  titulo: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  id_autor: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  id_editorial: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  id_genero_literario: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  vigente: boolean;
}
