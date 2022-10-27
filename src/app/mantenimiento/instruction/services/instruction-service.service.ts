import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructionServiceService {

  constructor(protected client: HttpClient) { }



  getInstruction(): Observable<any[]> {
    return this.client.get<any[]>('assets/instruction.json')
  }

}