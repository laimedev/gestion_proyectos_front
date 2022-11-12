export interface Proyecto {
    _id: number;
    nombre?: string;
    descripcion?: string;
    created?: string;
    responsable?: string;
    presupuesto?: string;
    fecha_inicio?: string;
    fecha_fin?: string;
    cliente?: string;
    cotizacion?: string;
    estado?: string;
}

export interface RootObject {
    total: number;
    data: Proyecto[];
    pageNumber: number;
    pageSize: number;
}

