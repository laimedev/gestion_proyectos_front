export interface Reporte {
    _id: number;
    trabajo?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
    horas?: number;
    observacion?: string;
    proyectoNombre?: string;
    proyectoID?: number;
    personalNombre?: string;
    personalID?: number;
}

export interface RootObject {
    total: number;
    data: Reporte[];
    pageNumber: number;
    pageSize: number;
}

