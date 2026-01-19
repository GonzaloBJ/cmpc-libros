import * as sequelize from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { EditorialEntity } from './editorial.entity';
import { AutorEntity } from './autor.entity';
import { GeneroLiterarioEntity } from './genero-literario.entity';

@Table({
  tableName: 'libros',
  timestamps: false
})
export class LibroEntity extends Model<
  sequelize.InferAttributes<LibroEntity>,
  sequelize.InferCreationAttributes<LibroEntity>
> {
  // @PrimaryKey
  // @AutoIncrement
  // @Column({ field: 'id', type: DataType.INTEGER })
  // declare id: sequelize.CreationOptional<number>;

  @Column({ field: 'titulo', type: DataType.STRING(150), allowNull: false })
  titulo: string;

  @ForeignKey(() => AutorEntity)
  @Column({ field: 'id_autor', type: DataType.INTEGER, allowNull: false })
  id_autor: number;

  @BelongsTo(() => AutorEntity)
  autor: AutorEntity;

  @ForeignKey(() => EditorialEntity)
  @Column({ field: 'id_editorial', type: DataType.INTEGER, allowNull: false })
  id_editorial: number;

  @BelongsTo(() => EditorialEntity)
  editorial: EditorialEntity;

  @ForeignKey(() => GeneroLiterarioEntity)
  @Column({ field: 'id_genero_literario', type: DataType.INTEGER, allowNull: false })
  id_genero_literario: number;

  @BelongsTo(() => GeneroLiterarioEntity)
  genero_literario: GeneroLiterarioEntity;

  @Column({ field: 'vigente', type: DataType.BOOLEAN, allowNull: false })
  vigente: boolean;
}
