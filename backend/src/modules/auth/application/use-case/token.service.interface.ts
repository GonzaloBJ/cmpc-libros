import { Usuario } from "../../domain/models/usuario.model";

export interface ITokenService {
  generate(usuario: Usuario): string;
}