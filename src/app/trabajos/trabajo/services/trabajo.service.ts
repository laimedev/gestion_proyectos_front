import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { Observable } from 'rxjs';

const base_url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class TrabajoService {


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

  set fillForm(trabajo: Trabajo) {
  this.formGroup.get('nombre').setValue(trabajo.nombre)
  this.formGroup.get('descripcion').setValue(trabajo.descripcion)
  this.formGroup.get('estado').setValue(trabajo.estado)
  }


 cargarTrabajos(desde: number = 0){
    const url = `${ base_url}trabajo/show?desde=${desde}`; 
    return this.http.get<any>(url)
  }

  getById(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>(environment.baseUrl + 'trabajo/showByID', trabajo)
  }

  create(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>(`${environment.baseUrl}trabajo`, trabajo)
  }

  edit(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.post<Trabajo>(environment.baseUrl + 'trabajo/update/' + trabajo._id, trabajo);
  }

  delete(trabajo: Trabajo): Observable<Trabajo> {
    return this.http.delete<Trabajo>(environment.baseUrl + 'trabajo/' + trabajo._id)
  }


}
