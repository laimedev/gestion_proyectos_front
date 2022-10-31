import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class ProyectoService {


  formGroup: FormGroup;


  constructor(protected http: HttpClient,
              protected router: Router,
              protected fb: FormBuilder) {

                this.formGroup = this.fb.group({
                  nombre: ['', [Validators.required]],
                  descripcion: ['', [Validators.required]],
                  responsable: ['', [Validators.required]],
                  presupuesto: ['', [Validators.required]],
                  fecha_inicio: ['', [Validators.required]],
                  fecha_fin: ['', [Validators.required]],
                  cliente: ['', [Validators.required]],
                  estado: [''],
                })      
                
                
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(proyecto: Proyecto) {
  this.formGroup.get('nombre').setValue(proyecto.nombre)
  this.formGroup.get('descripcion').setValue(proyecto.descripcion)

  this.formGroup.get('responsable').setValue(proyecto.responsable)
  this.formGroup.get('presupuesto').setValue(proyecto.presupuesto)
  this.formGroup.get('fecha_inicio').setValue(proyecto.fecha_inicio)
  this.formGroup.get('fecha_fin').setValue(proyecto.fecha_fin)
  this.formGroup.get('cliente').setValue(proyecto.cliente)

  this.formGroup.get('estado').setValue(proyecto.estado)
  }


 cargarProyectos(desde: number = 0){
    const url = `${ base_url}proyecto/show?desde=${desde}`; 
    return this.http.get<any>(url)
  }

  getById(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(environment.baseUrl + 'proyecto/showByID', proyecto)
  }

  getByStatus(proyecto: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'proyecto/showByStatus', proyecto)
  }


  getByPersonal(desde: number = 0, proyecto: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + `proyecto/showByPersonal?desde=${desde}`, proyecto)
  }

  create(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(`${environment.baseUrl}proyecto`, proyecto)
  }

  edit(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(environment.baseUrl + 'proyecto/update/' + proyecto._id, proyecto);
  }

  delete(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.delete<Proyecto>(environment.baseUrl + 'proyecto/' + proyecto._id)
  }

  export(): Observable<Proyecto> {
    return this.http.get<Proyecto>(environment.baseUrl + 'proyecto/exportar')
  }


  buscar(
    tipo: 'proyecto'|'tecnico'|'sede' |'usuario' |'dni' | 'email' | 'compra' | '_id',
    termino: string
  ) {
    const url = `${base_url}todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url)
    .pipe(
      map( (resp: any) => resp.resultados)
    );
  }




}