import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  constructor(protected client: HttpClient) { }


  getRol(): Observable<any[]> {
    return this.client.get<any[]>('assets/rol.json')
  }

  getUser(): Observable<any[]> {
    return this.client.get<any[]>('assets/user.json')
  }


}
