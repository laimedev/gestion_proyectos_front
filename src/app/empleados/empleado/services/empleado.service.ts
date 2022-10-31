import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/entities/modulos/empleado';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  


  formGroup: FormGroup;

  constructor(protected http: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

      this.formGroup = this.fb.group({
        nombres: ['', [Validators.required]],
        apellidos: ['', [Validators.required]],
        fecha_nacimiento: [''],
        sexo: ['', [Validators.required]],
        departamento: ['', [Validators.required]],
        cargo: ['', [Validators.required]],
        pago: ['', [Validators.required]],
        email: ['', [Validators.required]],
        avatar: [''],
        password_show: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      })      
      
      
    }



    get form (): FormGroup { return this.formGroup; }

    set fillForm(empleado: Empleado) {
    this.formGroup.get('nombres').setValue(empleado.nombres)
    this.formGroup.get('apellidos').setValue(empleado.apellidos)
    this.formGroup.get('fecha_nacimiento').setValue(empleado.fecha_nacimiento)
    this.formGroup.get('sexo').setValue(empleado.sexo)
    this.formGroup.get('departamento').setValue(empleado.departamento)
    this.formGroup.get('cargo').setValue(empleado.cargo)
    this.formGroup.get('pago').setValue(empleado.pago)
    this.formGroup.get('email').setValue(empleado.email)
    this.formGroup.get('avatar').setValue(empleado.avatar)
    this.formGroup.get('password_show').setValue(empleado.password_show)
    this.formGroup.get('estado').setValue(empleado.estado)
    }


    cargarEmpleados(desde: number = 0){
    const url = `${ base_url}personal/show?desde=${desde}`; 
    return this.http.get<any>(url)
    }

    getById(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(environment.baseUrl + 'personal/showByID', empleado)
    }

    create(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${environment.baseUrl}personal`, empleado)
    }

    edit(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(environment.baseUrl + 'personal/update/' + empleado._id, empleado);
    }

    delete(empleado: Empleado): Observable<Empleado> {
    return this.http.delete<Empleado>(environment.baseUrl + 'personal/' + empleado._id)
    }



    export(): Observable<Empleado> {
      return this.http.get<Empleado>(environment.baseUrl + 'personal/exportar')
    }


    buscar(
      tipo: 'personal'|'tecnico'|'sede' |'usuario' |'dni' | 'email' | 'compra' | '_id',
      termino: string
    ) {
      const url = `${base_url}todo/coleccion/${tipo}/${termino}`;
      return this.http.get<any[]>(url)
      .pipe(
        map( (resp: any) => resp.resultados)
      );
    }
  
    
}
