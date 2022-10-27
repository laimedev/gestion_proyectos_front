import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CivilServiceService {

  constructor(protected client: HttpClient) { }



  getCivil(): Observable<any[]> {
    return this.client.get<any[]>('assets/civil_status.json')
  }

}
