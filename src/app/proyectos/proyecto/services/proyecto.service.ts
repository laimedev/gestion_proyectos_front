import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { Observable } from 'rxjs';

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
                  estado: [''],
                })      
                
                
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(proyecto: Proyecto) {
  this.formGroup.get('nombre').setValue(proyecto.nombre)
  this.formGroup.get('descripcion').setValue(proyecto.descripcion)
  this.formGroup.get('estado').setValue(proyecto.estado)
  }


 cargarProyectos(desde: number = 0){
    const url = `${ base_url}proyecto/show?desde=${desde}`; 
    return this.http.get<any>(url)
    // return this.http.get<CargarCurso>(url)
  }


  getById(proyecto: Proyecto): Observable<Proyecto> {
    return this.http.post<Proyecto>(environment.baseUrl + 'proyecto/showByID', proyecto)
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


}
