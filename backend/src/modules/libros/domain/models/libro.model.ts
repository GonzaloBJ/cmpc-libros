export class Libro {
  constructor(
    public readonly id: number,
    public titulo: string,
    public idAutor: number,
    public idEditorial: number,
    public idGeneroLiterario: number,
    public vigente: boolean,
  ) {}
}