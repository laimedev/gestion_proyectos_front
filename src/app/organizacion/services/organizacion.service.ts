import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {

  constructor(protected client: HttpClient) { }


  getEmpleados(): Observable<any[]> {
    return this.client.get<any[]>('assets/empleados.json')
  }

  getCargo(): Observable<any[]> {
    return this.client.get<any[]>('assets/cargos.json')
  }

  getDepartamento(): Observable<any[]> {
    return this.client.get<any[]>('assets/departamentos.json')
  }


}