import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CapacidadCommand } from '../domain/capacidad-command';
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CapacidadService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<CapacidadCommand>): Observable<Page<CapacidadCommand>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<CapacidadCommand>>(`${environment.baseUrl}/monitoreo/capacidad`, { params })
  }

  public export2(filter: PageRequest<CapacidadCommand>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/capacidad`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []

        return data
      }))
  }

  public export(filter: PageRequest<CapacidadCommand>): Observable<any> {
    return this.client.post(`${environment.baseUrl}/monitoreo/export/capacidad`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.fecha_creacion = item.created_at;
        delete item.created_at;

      })
      return data.data;

    }))
  }

}
