import { Usuario } from "../models/usuario.model";


export interface IUsuarioRepository {
    findByEmail(email: string): Promise<Usuario | null>;
    create(user: Usuario): Promise<Usuario>;
}
