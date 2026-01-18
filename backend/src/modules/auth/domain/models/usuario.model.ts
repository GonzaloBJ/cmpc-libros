export class Usuario {
  constructor(
    public readonly id: number | null,
    public readonly email: string,
    public readonly passwordHash: string,
    public readonly isActive: boolean
  ) {}
}