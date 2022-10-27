import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CobeturaCommand } from '../domain/cobertura-command';
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<CobeturaCommand>): Observable<Page<CobeturaCommand>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<CobeturaCommand>>(`${environment.baseUrl}/monitoreo/cobertura`, { params })
  }

  public export2(filter: PageRequest<CobeturaCommand>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/cobertura`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []
        return data
      }))
  }

  public export(filter: PageRequest<CobeturaCommand>): Observable<any> {
    return this.client.post(`${environment.baseUrl}/monitoreo/export/cobertura`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.fecha_creacion = item.created_at;
        delete item.created_at;

      })
      return data.data;

    }))
  }

}
