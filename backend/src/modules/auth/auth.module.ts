import { Module } from "@nestjs/common";
import { AuthController } from "./presentation/controllers/auth.controller";
import { LoginService } from "./application/use-case/login.service";
import { UsuarioSequelizeRepository } from "./infrastructure/persistence/sequelize/adapters/usuario.sequelize.repository";
import { BcryptService } from "./infrastructure/security/password-hasher.bcrypt.service";
import { JwtTokenService } from "./infrastructure/security/jwt.token.service";
import { TOKEN_SERVICE } from "./application/use-case/token.service.token";
import { USUARIO_REPOSITORY } from "./domain/repositories/usuario.repository.token";
import { PASSWORD_HASHER_SERVICE } from "./domain/services/password-hasher.service.token";
import { CreateUserService } from "./application/use-case/user.create.service";
import { JwtModule } from "@nestjs/jwt";
import { UsuarioEntity } from "./infrastructure/persistence/sequelize/entities/usuario.entity";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { StringValue } from 'ms';
import { JwtStrategy } from "./infrastructure/security/jwt.strategy.service";

@Module({

    imports: [
        SequelizeModule.forFeature([UsuarioEntity]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET')!,
                signOptions: {
                    expiresIn: config.get<StringValue>('JWT_EXPIRES_IN', '1h'),
                },
            }),
        })
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        LoginService,
        CreateUserService,
        { provide: USUARIO_REPOSITORY, useClass: UsuarioSequelizeRepository },
        { provide: PASSWORD_HASHER_SERVICE, useClass: BcryptService },
        { provide: TOKEN_SERVICE, useClass: JwtTokenService },
    ],
})
export class AuthModule { }