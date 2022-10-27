export class Propiedad {

    constructor(
        public id_productor?: string,
        public nombres?: string,
        public apellido_p?: string,
        public apellido_m?: string,
        public dni?: string,
        public sexo?: string,
        public estado?: string,
        public grado_instruccion?: string,
        public fecha_inscripcion?: string,
        public correo?: string,
        public telefono?: string,
        public celular?: string,
        public ubigeo?: string,
        public departamento?: string,
        public provincia?: string,
        public distrito?: string,
        public direccion?: string,
    ) {}


    
}


export interface CargarPropiedad {
    total: number;
    propiedad: Propiedad[];
}


