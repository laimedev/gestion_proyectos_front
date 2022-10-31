import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Reporte } from 'src/app/entities/modulos/reporte';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  formGroup: FormGroup;


  constructor(protected http: HttpClient,
              protected router: Router,
              protected fb: FormBuilder) {

                this.formGroup = this.fb.group({
                  trabajo: ['', [Validators.required]],
                  fecha_desde: ['', [Validators.required]],
                  fecha_hasta: ['', [Validators.required]],
                  horas: ['', [Validators.required]],
                  observacion: ['', [Validators.required]],
                  proyectoNombre: ['', [Validators.required]],
                  proyectoID: ['', [Validators.required]],
                  personalNombre: ['', [Validators.required]],
                  personalID: ['', [Validators.required]],
                })      
                
                
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(reporte: Reporte) {
  this.formGroup.get('trabajo').setValue(reporte.trabajo)
  this.formGroup.get('fecha_desde').setValue(reporte.fecha_desde)
  this.formGroup.get('fecha_hasta').setValue(reporte.fecha_hasta)
  this.formGroup.get('horas').setValue(reporte.horas)
  this.formGroup.get('observacion').setValue(reporte.observacion)
  this.formGroup.get('proyectoNombre').setValue(reporte.proyectoNombre)
  this.formGroup.get('proyectoID').setValue(reporte.proyectoID)
  this.formGroup.get('personalNombre').setValue(reporte.personalNombre)
  this.formGroup.get('personalID').setValue(reporte.personalID)
  }


 cargarProyectos(desde: number = 0){
    const url = `${ base_url}proyecto/show?desde=${desde}`; 
    return this.http.get<any>(url)
  }

  // getById(proyecto: Proyecto): Observable<Proyecto> {
  //   return this.http.post<Proyecto>(environment.baseUrl + 'proyecto/showByID', proyecto)
  // }

  // getByStatus(proyecto: any): Observable<any> {
  //   return this.http.post<any>(environment.baseUrl + 'proyecto/showByStatus', proyecto)
  // }


  // getByPersonal(desde: number = 0, proyecto: any): Observable<any> {
  //   return this.http.post<any>(environment.baseUrl + `proyecto/showByPersonal?desde=${desde}`, proyecto)
  // }

  create(reporte: Reporte): Observable<Reporte> {
    return this.http.post<Reporte>(`${environment.baseUrl}reporte`, reporte)
  }

  // edit(proyecto: Proyecto): Observable<Proyecto> {
  //   return this.http.post<Proyecto>(environment.baseUrl + 'proyecto/update/' + proyecto._id, proyecto);
  // }

  delete(reporte: Reporte): Observable<Reporte> {
    return this.http.delete<Reporte>(environment.baseUrl + 'reporte/' + reporte._id)
  }

  // export(): Observable<Proyecto> {
  //   return this.http.get<Proyecto>(environment.baseUrl + 'proyecto/exportar')
  // }


  // buscar(
  //   tipo: 'proyecto'|'tecnico'|'sede' |'usuario' |'dni' | 'email' | 'compra' | '_id',
  //   termino: string
  // ) {
  //   const url = `${base_url}todo/coleccion/${tipo}/${termino}`;
  //   return this.http.get<any[]>(url)
  //   .pipe(
  //     map( (resp: any) => resp.resultados)
  //   );
  // }




}