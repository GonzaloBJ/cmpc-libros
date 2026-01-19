import { Autor } from "./autor.model";
import { Editorial } from "./editorial.model";
import { GeneroLiterario } from "./genero-literario.model";

export class Libro {
  constructor(
    public readonly id: number,
    public titulo: string,
    public autor: Autor,
    public editorial: Editorial,
    public generoLiterario: GeneroLiterario,
    public vigente: boolean,
  ) {}
}