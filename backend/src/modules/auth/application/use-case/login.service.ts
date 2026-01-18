import { Inject } from "@nestjs/common";
import * as usuarioRepositoryInterface from "../../domain/repositories/usuario.repository.interface";
import * as passwordHasherServiceInterface from "../../domain/services/password-hasher.service.interface";
import * as tokenServiceInterface from "./token.service.interface";
import { USUARIO_REPOSITORY } from "../../domain/repositories/usuario.repository.token";
import { PASSWORD_HASHER_SERVICE } from "../../domain/services/password-hasher.service.token";
import { TOKEN_SERVICE } from "./token.service.token";

export class LoginService {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepo: usuarioRepositoryInterface.IUsuarioRepository,
    @Inject(PASSWORD_HASHER_SERVICE)
    private readonly passwordHasher: passwordHasherServiceInterface.IPasswordHasher,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: tokenServiceInterface.ITokenService
  ) {}

  async execute(email: string, password: string) {
    const usuario = await this.usuarioRepo.findByEmail(email);

    if (!usuario || !usuario.isActive) {
      throw new Error('Credenciales inválidas');
    }

    const isValid = await this.passwordHasher.compare(
      password,
      usuario.passwordHash
    );

    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    return {
      accessToken: this.tokenService.generate(usuario),
    };
  }
}
