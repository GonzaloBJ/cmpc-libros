import * as bcrypt from 'bcrypt';
import { IPasswordHasher } from '../../domain/services/password-hasher.service.interface';

export class BcryptService implements IPasswordHasher {
    private readonly saltRounds = 10;

    hash(plain: string): Promise<string> {
        return bcrypt.hash(plain, this.saltRounds);
    }

    compare(plain: string, hash: string): Promise<boolean> {
        return bcrypt.compare(plain, hash);
    }
}
