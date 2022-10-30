import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Departamento } from 'src/app/entities/modulos/departamento';
import { Observable } from 'rxjs';

const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

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

  set fillForm(departamento: Departamento) {
  this.formGroup.get('nombre').setValue(departamento.nombre)
  this.formGroup.get('descripcion').setValue(departamento.descripcion)
  this.formGroup.get('estado').setValue(departamento.estado)
  }


 cargarDepartamento(desde: number = 0){
    const url = `${ base_url}departamento/show?desde=${desde}`; 
    return this.http.get<any>(url)
  }

  getById(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(environment.baseUrl + 'departamento/showByID', departamento)
  }

  create(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${environment.baseUrl}departamento`, departamento)
  }

  edit(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(environment.baseUrl + 'departamento/update/' + departamento._id, departamento);
  }

  delete(departamento: Departamento): Observable<Departamento> {
    return this.http.delete<Departamento>(environment.baseUrl + 'departamento/' + departamento._id)
  }


}
