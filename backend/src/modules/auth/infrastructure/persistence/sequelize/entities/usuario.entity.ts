import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'usuarios', timestamps: false })
export class UsuarioEntity extends Model {
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string;

	@Column({ type: DataType.STRING, allowNull: false })
	password_hash: string;

	@Column({ type: DataType.BOOLEAN, defaultValue: true })
	is_active: boolean;
}