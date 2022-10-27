import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UbigeoServiceService {

  constructor(protected client: HttpClient) { }



  getUbigeo(): Observable<any[]> {
    return this.client.get<any[]>('assets/ubigeo.json')
  }

}