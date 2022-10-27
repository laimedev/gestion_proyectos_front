export interface Proyecto {
    _id: number;
    nombre?: string;
    descripcion?: string;
    created?: string;
    estado?: string;
}

export interface RootObject {
    total: number;
    data: Proyecto[];
    pageNumber: number;
    pageSize: number;
}

