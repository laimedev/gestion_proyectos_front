import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const base_url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(protected http: HttpClient,
    protected router: Router,
    protected fb: FormBuilder) {

    }



  showReport(range: any): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}reporte/showRangeDate`, range)
  }


}
