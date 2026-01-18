import { Inject } from '@nestjs/common';
import { USUARIO_REPOSITORY } from '../../domain/repositories/usuario.repository.token';
import { PASSWORD_HASHER_SERVICE } from '../../domain/services/password-hasher.service.token';
import * as usuarioRepositoryInterface from '../../domain/repositories/usuario.repository.interface';
import * as passwordHasherServiceInterface from '../../domain/services/password-hasher.service.interface';
import { Usuario } from '../../domain/models/usuario.model';


export class CreateUserService {
    constructor(
        @Inject(USUARIO_REPOSITORY)
        private readonly usuarioRepo: usuarioRepositoryInterface.IUsuarioRepository,

        @Inject(PASSWORD_HASHER_SERVICE)
        private readonly passwordHasher: passwordHasherServiceInterface.IPasswordHasher,
    ) { }

    async execute(email: string, password: string): Promise<void> {
        const exists = await this.usuarioRepo.findByEmail(email);
        if (exists) {
            throw new Error('El usuario ya existe');
        }

        const hash = await this.passwordHasher.hash(password);

        const user = new Usuario(null, email, hash, true);
        await this.usuarioRepo.create(user);

    }
}