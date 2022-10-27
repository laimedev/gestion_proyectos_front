import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RadarCommand } from '../domain/radar-command';
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RadarService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<RadarCommand>): Observable<Page<RadarCommand>> {
    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<RadarCommand>>(`${environment.baseUrl}/monitoreo/radar`, { params })
  }

  public export(filter: PageRequest<RadarCommand>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/radar`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []
        return data
      }))
  }
}
