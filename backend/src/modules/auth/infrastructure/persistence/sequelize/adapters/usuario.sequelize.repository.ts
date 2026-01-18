
import { IUsuarioRepository } from 'src/modules/auth/domain/repositories/usuario.repository.interface';
import { UsuarioEntity } from '../entities/usuario.entity';
import { Usuario } from 'src/modules/auth/domain/models/usuario.model';
import { console } from 'inspector';
import { UsuarioMapper } from '../../../mappers/usuario.mapper';

export class UsuarioSequelizeRepository implements IUsuarioRepository {

  async findByEmail(email: string): Promise<Usuario | null> {
    const model = await UsuarioEntity.findOne({ where: { email } });
    if (!model) return null;

    return UsuarioMapper.toDomain(model);
  }

  async create(user: Usuario): Promise<Usuario> {
    const created = await UsuarioEntity.create({
      email: user.email,
      password_hash: user.passwordHash,
      is_active: user.isActive,
    });

    return UsuarioMapper.toDomain(created);
  }
}
