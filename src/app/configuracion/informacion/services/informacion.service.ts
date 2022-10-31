import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Configuracion } from 'src/app/entities/modulos/configuracion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class InformacionService {
  formGroup: FormGroup;


  constructor(protected http: HttpClient,
              protected router: Router,
              protected fb: FormBuilder) {

                this.formGroup = this.fb.group({
                  titulo: ['', [Validators.required]],
                  descripcion: ['', [Validators.required]],
                  ruc: ['', [Validators.required]],
                  razonSocial: ['', [Validators.required]],
                  direccion: ['', [Validators.required]],
                  telefono: ['', [Validators.required]],
                  correo: ['', [Validators.required]],
                  web: ['', [Validators.required]],
                  logo: [''],
                })      
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(configuracion: Configuracion) {
  this.formGroup.get('titulo').setValue(configuracion.titulo)
  this.formGroup.get('descripcion').setValue(configuracion.descripcion)
  this.formGroup.get('ruc').setValue(configuracion.ruc)
  this.formGroup.get('razonSocial').setValue(configuracion.razonSocial)
  this.formGroup.get('direccion').setValue(configuracion.direccion)
  this.formGroup.get('telefono').setValue(configuracion.telefono)
  this.formGroup.get('correo').setValue(configuracion.correo)
  this.formGroup.get('web').setValue(configuracion.web)
  this.formGroup.get('logo').setValue(configuracion.logo)
  }


  cargarConfiguracion(){
    const url = `${ base_url}configuracion/show`; 
    return this.http.get<any>(url)
  }

  edit(configuracion: Configuracion): Observable<Configuracion> {
    return this.http.post<Configuracion>(environment.baseUrl + `configuracion/update/0`, configuracion);
  }

  buscarRuc(_ruc: string): Observable<any>{
    let data = {
      ruc: _ruc
    };
    let url = "https://www.softwarelion.xyz/api/sunat/consulta-ruc";
    let token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozMzIxLCJjb3JyZW8iOiJhbGFpbWVzNjRAZ21haWwuY29tIiwiaWF0IjoxNjY3MTQwNzU2fQ._FaxGDpjO4D_QLL5An7dc3uUdJWfEOsYyvlA70yMR3Q";
    let _headers = new HttpHeaders().set("Authorization", token);
    return this.http.post(url, data, {headers: _headers});
  }


}