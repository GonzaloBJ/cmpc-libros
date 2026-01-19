import { Autor } from "./autor.model";
import { Editorial } from "./editorial.model";
import { GeneroLiterario } from "./genero-literario.model";
import { Libro } from "./libro.model";

export class StockLibros {
  constructor(
    public readonly id: number,
    public libro: Libro,
    public precio: number,
    public disponibles: number,
    public fechaRegistro: Date,
    public vigente: boolean,
  ) {}
}