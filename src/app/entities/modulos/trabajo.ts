export interface Trabajo {
    _id: number;
    nombre?: string;
    descripcion?: string;
    created?: string;
    costo?: number;
    estado?: string;
}

export interface RootObject {
    total: number;
    data: Trabajo[];
    pageNumber: number;
    pageSize: number;
}

