import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/entities/modulos/cliente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  formGroup: FormGroup;


  constructor(protected http: HttpClient,
              protected router: Router,
              protected fb: FormBuilder) {

                this.formGroup = this.fb.group({
                  ruc: ['', [Validators.required]],
                  razonSocial: ['', [Validators.required]],
                  condicion: ['', [Validators.required]],
                  direccion: ['', [Validators.required]],
                  departamento: ['', [Validators.required]],
                  provincia: ['', [Validators.required]],
                  distrito: ['', [Validators.required]],
                  telefono: [''],
                  correo: [''],
                })      
              }



  get form (): FormGroup { return this.formGroup; }

  set fillForm(cliente: Cliente) {
  this.formGroup.get('ruc').setValue(cliente.ruc)
  this.formGroup.get('razonSocial').setValue(cliente.razonSocial)
  this.formGroup.get('condicion').setValue(cliente.condicion)
  this.formGroup.get('direccion').setValue(cliente.direccion)
  this.formGroup.get('departamento').setValue(cliente.departamento)
  this.formGroup.get('provincia').setValue(cliente.provincia)
  this.formGroup.get('distrito').setValue(cliente.distrito)
  this.formGroup.get('telefono').setValue(cliente.telefono)
  this.formGroup.get('correo').setValue(cliente.correo)
  }


 cargarClientes(desde: number = 0){
    const url = `${ base_url}cliente/show?desde=${desde}`; 
    return this.http.get<any>(url)
  }

  getById(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(environment.baseUrl + 'cliente/showByID', cliente)
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${environment.baseUrl}cliente`, cliente)
  }

  edit(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(environment.baseUrl + 'cliente/update/' + cliente._id, cliente);
  }

  delete(cliente: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(environment.baseUrl + 'cliente/' + cliente._id)
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


  export(): Observable<Cliente> {
    return this.http.get<Cliente>(environment.baseUrl + 'cliente/exportar')
  }


  buscar(
    tipo: 'cliente'|'tecnico'|'sede' |'usuario' |'dni' | 'email' | 'compra' | '_id',
    termino: string
  ) {
    const url = `${base_url}todo/coleccion/${tipo}/${termino}`;
    return this.http.get<any[]>(url)
    .pipe(
      map( (resp: any) => resp.resultados)
    );
  }


}