import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  constructor(protected client: HttpClient) { }



  getGender(): Observable<any[]> {
    return this.client.get<any[]>('assets/gender.json')
  }

}
