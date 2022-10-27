import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {



  constructor(protected client: HttpClient) { }


  getAreas(): Observable<any[]> {
    return this.client.get<any[]>('assets/area.json')
  }

}
