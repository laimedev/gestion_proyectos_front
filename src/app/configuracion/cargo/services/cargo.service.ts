import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cargo } from 'src/app/entities/modulos/cargo';
import { Observable } from 'rxjs';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class CargoService {
  formGroup: FormGroup;


  constructor(protected http: HttpClient,
              protected router: Router,
              protected fb: FormBuilder) {

                this.formGroup = this.fb.group({
                  nombre: ['', [Validators.required]],
                  descripcion: ['', [Validators.required]],
                  departamento: ['', [Validators.required]],
                  estado: [''],
                })      
                
                
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(proyecto: Cargo) {
  this.formGroup.get('nombre').setValue(proyecto.nombre)
  this.formGroup.get('descripcion').setValue(proyecto.descripcion)
  this.formGroup.get('departamento').setValue(proyecto.departamento)
  this.formGroup.get('estado').setValue(proyecto.estado)
  }


 cargarCargo(desde: number = 0){
    const url = `${ base_url}cargo/show?desde=${desde}`; 
    return this.http.get<any>(url)
  }

  getById(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(environment.baseUrl + 'cargo/showByID', cargo)
  }

  create(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(`${environment.baseUrl}cargo`, cargo)
  }

  edit(cargo: Cargo): Observable<Cargo> {
    return this.http.post<Cargo>(environment.baseUrl + 'cargo/update/' + cargo._id, cargo);
  }

  delete(cargo: Cargo): Observable<Cargo> {
    return this.http.delete<Cargo>(environment.baseUrl + 'cargo/' + cargo._id)
  }


}
