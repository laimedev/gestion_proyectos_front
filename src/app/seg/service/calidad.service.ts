import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CalidadCommand } from '../domain/calidad-command';
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CalidadService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<CalidadCommand>): Observable<Page<CalidadCommand>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<CalidadCommand>>(`${environment.baseUrl}/monitoreo/calidad`, { params })
  }

  /*public export1(filter: PageRequest<CalidadCommand>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/calidad`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        delete d.created_at;
        let data = d ?? []
        return data
      }))
  }*/


  public export(filter: PageRequest<CalidadCommand>): Observable<any> {

    return this.client.post(`${environment.baseUrl}/monitoreo/export/calidad`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.fecha_creacion=item.created_at;
        delete item.created_at;

      })
      return data.data;

    }))
  }

}
