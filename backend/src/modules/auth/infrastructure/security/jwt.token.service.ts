import { JwtService } from '@nestjs/jwt';
import { ITokenService } from '../../application/use-case/token.service.interface';
import { Usuario } from '../../domain/models/usuario.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenService implements ITokenService {
    constructor(private readonly jwt: JwtService) { }

    generate(user: Usuario): string {
        try {
        return this.jwt.sign({
            sub: user.id,
            email: user.email,
        });
        } catch (error) {
            console.error('Error generating JWT token:', error);
            throw error;
        }
    }
}
