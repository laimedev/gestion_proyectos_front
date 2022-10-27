import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {NeiranCommand} from '../domain/neiran-command'
import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NeiranService {

  constructor(protected client: HttpClient) { 
  }


  getAll(request: PageRequest<NeiranCommand>): Observable<Page<NeiranCommand>> {

    const params = new HttpParams().set('json', JSON.stringify(request));

    return this.client.get<Page<NeiranCommand>>(`${environment.baseUrl}/security/neiran`, { params })

  }

  public createCommand(entity: NeiranCommand): Observable<boolean> {
       
    return this.client.post<boolean>(`${environment.baseUrl}/security/neiran`, entity)
  }

  public byId(id: number): Observable<NeiranCommand> {
    return this.client.get<NeiranCommand>(`${environment.baseUrl}/security/neiran/${id}`)

  }

  public edit(cmd: NeiranCommand): Observable<boolean> {
    return this.client.put<boolean>(`${environment.baseUrl}/security/neiran/${cmd.id}`, cmd);
  }

  public delete(id:number) {
    return this.client.delete<boolean>(`${environment.baseUrl}/security/neiran/${id}`)
  }

  public export2(filter: PageRequest<NeiranCommand>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/security/export/neiran`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []        
        return data
      }))
  }

  public export(filter: PageRequest<NeiranCommand>): Observable<any> {
    return this.client.post(`${environment.baseUrl}/security/export/neiran`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.fecha_creacion = item.created_at;
        delete item.created_at;

      })
      return data.data;

    }))
  }

  monitoreo(request: PageRequest<NeiranCommand>): Observable<Page<any>> {

    const params = new HttpParams().set('json', JSON.stringify(request));

    return this.client.get<Page<any>>(`${environment.baseUrl}/monitoreo/neiran`, { params })

  }

  public monitoreoExport(filter: PageRequest<NeiranCommand>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/neiran`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []        
        return data
      }))
  }

}
