import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PageRequest } from '../../../utils/paginator/page-utils';
import { User } from '../../../entities/security/user';
import { Observable } from 'rxjs';

import { CargarProductor } from '../model/productor.model';

const base_url = environment.url;


@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  

  constructor(protected client: HttpClient) { }


  getAll(): Observable<any> {
    return this.client.get('assets/producer.json');
  }


  getAllVPN(): Observable<any> {
    return this.client.get('assets/vpn.json');
  }



  cargarProductores(desde: number = 0){
    const url = `${base_url}/productor/obtener?desde=${desde}`; 
    return this.client.get<any>(url)
  }

  cargarPropiedades(desde: number = 0){
    const url = `${base_url}/propiedad/obtener?desde=${desde}`; 
    return this.client.get<any>(url)
  }



  cargarProductoresTodo(){
    const url = `${base_url}/productor`; 
    return this.client.get<any>(url)
  }


  cargarPropiedadesTodo(){
    const url = `${base_url}/propiedad`; 
    return this.client.get<any>(url)
  }


  showProductor(formData: any){
    return this.client.post(`${base_url}/productor/show`, formData)
  }

  showPropiedad(formData: any){
    return this.client.post(`${base_url}/propiedad/show`, formData)
  }


  crearProductor(formData: any){
    return this.client.post(`${base_url}/productor`, formData)
  }

  crearPropiedad(formData: any){
    return this.client.post(`${base_url}/propiedad`, formData)
  }


  editarProductor(id: any,formData: any){
    return this.client.put(`${base_url}/productor/update/${id}`, formData)
  }

  editarPropiedad(id: any,formData: any){
    return this.client.put(`${base_url}/propiedad/update/${id}`, formData)
  }




}
