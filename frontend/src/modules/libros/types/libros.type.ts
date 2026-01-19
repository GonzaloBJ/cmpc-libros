export type Libro = {
    id: number;
    titulo: string;
    vigente: boolean;
    autor: {
        id: number;
        nombre: string;
    };
    editorial: {
        id: number;
        nombre: string;
    };
    generoLiterario: {
        id: number;
        nombre: string;
    };
};