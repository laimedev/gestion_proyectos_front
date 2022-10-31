export interface Reporte {
    _id: number;
    trabajo?: string;
    fecha_desde?: string;
    fecha_hasta?: string;
    horas?: string;
    observacion?: string;
    proyectoNombre?: string;
    proyectoID?: string;
    personalNombre?: string;
    personalID?: string;
}

export interface RootObject {
    total: number;
    data: Reporte[];
    pageNumber: number;
    pageSize: number;
}

