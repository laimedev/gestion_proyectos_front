import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tarea } from 'src/app/entities/modulos/tarea';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class TareaService {


  formGroup: FormGroup;


  constructor(protected http: HttpClient,
              protected router: Router,
              protected fb: FormBuilder) {

                this.formGroup = this.fb.group({
                  nombre: ['', [Validators.required]],
                  actividad: ['', [Validators.required]],
                })      
                
                
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(tarea: Tarea) {
  this.formGroup.get('nombre').setValue(tarea.nombre)
  this.formGroup.get('actividad').setValue(tarea.actividad)
  }


//  cargarTareas(desde: number = 0){
//     const url = `${ base_url}tarea/showByIDTarea`; 
//     return this.http.post<any>(url)
//   }

  cargarTareas(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${environment.baseUrl}tarea/showByIDTarea`, {"actividad": tarea})
  }

  // getById(trabajo: Trabajo): Observable<Trabajo> {
  //   return this.http.post<Trabajo>(environment.baseUrl + 'trabajo/showByID', trabajo)
  // }

  create(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${environment.baseUrl}tarea`, tarea)
  }

  // edit(trabajo: Trabajo): Observable<Trabajo> {
  //   return this.http.post<Trabajo>(environment.baseUrl + 'trabajo/update/' + trabajo._id, trabajo);
  // }

  delete(tarea: Tarea): Observable<Tarea> {
    return this.http.delete<Tarea>(environment.baseUrl + 'tarea/' + tarea._id)
  }


  // export(): Observable<Trabajo> {
  //   return this.http.get<Trabajo>(environment.baseUrl + 'trabajo/exportar')
  // }


  // buscar(
  //   tipo: 'trabajo'|'tecnico'|'sede' |'usuario' |'dni' | 'email' | 'compra' | '_id',
  //   termino: string
  // ) {
  //   const url = `${base_url}todo/coleccion/${tipo}/${termino}`;
  //   return this.http.get<any[]>(url)
  //   .pipe(
  //     map( (resp: any) => resp.resultados)
  //   );
  // }

}
