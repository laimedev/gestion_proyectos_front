import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Thresholds } from '../domain/thresholds-comand';
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThresholdService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<Thresholds>): Observable<Page<Thresholds>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<Thresholds>>(`${environment.baseUrl}/security/evaluation/thresholds`, { params })
  }

  public createCommand(entity: Thresholds): Observable<boolean> {

    return this.client.post<boolean>(`${environment.baseUrl}/security/evaluation/thresholds`, entity)
  }

  public byId(id: number): Observable<Thresholds> {
    return this.client.get<Thresholds>(`${environment.baseUrl}/security/evaluation/thresholds/${id}`)
  }

  public edit(cmd: Thresholds): Observable<boolean> {
    return this.client.put<boolean>(`${environment.baseUrl}/security/evaluation/thresholds/${cmd.id}`, cmd);
  }

  public delete(id: number) {
    return this.client.delete<boolean>(`${environment.baseUrl}/security/evaluation/thresholds/${id}`)
  }

  public export2(filter: PageRequest<Thresholds>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/security/export/evaluation/thresholds`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []
        return data
      }))
  }

  public export(filter: PageRequest<Thresholds>): Observable<any> {
    return this.client.post(`${environment.baseUrl}/security/export/evaluation/thresholds`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.flujo = item.flow;
        delete item.flow;

        item.nombres = item.name_threshold;
        delete item.name_threshold;

        item.thresholds = item.value_threshold;
        delete item.value_threshold

        item.unidad = item.unit;
        delete item.unit;

        item.descripcion = item.description;
        delete item.description;

        item.fecha_creacion = item.created_at;
        delete item.created_at;

      })
      return data.data;

    }))
  }

}
