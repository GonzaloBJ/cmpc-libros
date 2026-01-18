import { Usuario } from "../../domain/models/usuario.model";
import { UsuarioEntity } from "../persistence/sequelize/entities/usuario.entity";

export class UsuarioMapper {
    static toDomain(entity: any): Usuario {
        return new Usuario(
            entity.dataValues.id,
            entity.dataValues.email,
            entity.dataValues.password_hash,
            entity.dataValues.is_active,
        );
    }
    static toPersistence(domain: Usuario): UsuarioEntity {
        let usuarioEntity = new UsuarioEntity();
        usuarioEntity.id = domain.id;
        usuarioEntity.email = domain.email;
        usuarioEntity.password_hash = domain.passwordHash;
        usuarioEntity.is_active = domain.isActive;
        return usuarioEntity;
    }
}