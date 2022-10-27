import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NeiranMonitoreoCommand } from '../domain/neiran-monitoreo-command';
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NeiranMonitoreoService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<NeiranMonitoreoService>): Observable<Page<NeiranMonitoreoService>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<NeiranMonitoreoService>>(`${environment.baseUrl}/monitoreo/neiran`, { params })
  }

  public export2(filter: PageRequest<NeiranMonitoreoService>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/neiran`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []
        return data
      }))
  }

  public export(filter: PageRequest<NeiranMonitoreoService>): Observable<any> {
    return this.client.post(`${environment.baseUrl}//monitoreo/export/neiran`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.fecha_creacion = item.created_at;
        delete item.created_at;

        delete item.updated_at;
        delete item.deleted_at;
        delete item.device_no;
        delete item.subunit_no;
      })
      return data.data;

    }))
  }

}
