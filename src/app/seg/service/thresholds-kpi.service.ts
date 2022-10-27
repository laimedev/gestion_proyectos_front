import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThresholdsKpiService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<any>): Observable<Page<any>> {

    const params = new HttpParams().set('json', JSON.stringify(request));

    return this.client.get<Page<any>>(`${environment.baseUrl}/security/thresholds`, { params })

  }

  public edit(th: any): Observable<boolean> {
    return this.client.put<boolean>(`${environment.baseUrl}/security/thresholds/${th.id}`, th);
  }

  public byId(id: number): Observable<any> {
    return this.client.get<any>(`${environment.baseUrl}/security/thresholds/${id}`)

  }

  create(entity: any) {
    return this.client.post<boolean>(`${environment.baseUrl}/security/thresholds`, entity)
  }

  public export(filter: PageRequest<any>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/security/export/thresholds`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []
        return data
      }))
  }

  public delete(id: number) {
    return this.client.delete<boolean>(`${environment.baseUrl}/security/thresholds/${id}`)
  }

  monitoreo(request: PageRequest<any>): Observable<Page<any>> {

    const params = new HttpParams().set('json', JSON.stringify(request));

    return this.client.get<Page<any>>(`${environment.baseUrl}/monitoreo/thresholds`, { params })

  }

  public monitoreoExport2(filter: PageRequest<any>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/monitoreo/export/thresholds`, filter)
      .pipe(map((res: any) => {
        let d = res?.data
        let data = d ?? []
        return data
      }))
  }

  public monitoreoExport(filter: PageRequest<any>): Observable<any> {
    return this.client.post(`${environment.baseUrl}/monitoreo/export/thresholds`, filter).pipe(map(function (data: any) {

      data.data.map(function (item) {

        item.resultado = item.gral_result;
        delete item.gral_result;

        item.eval1_1 = item.eval_1
        delete item.eval_1;
        item.eval_1 = item.eval1_1
        delete item.eval1_1;

        item.result_1 = item.result_eval_1;
        delete item.result_eval_1;

        item.eval2_2= item.eval_2;
        delete item.eval_2;
        item.eval_2=item.eval2_2;
        delete item.eval2_2;

        item.result_2 = item.result_eval_2;
        delete item.result_eval_2;  

        item.eval3_3= item.eval_3;
        delete item.eval_3;
        item.eval_3=item.eval3_3;
        delete item.eval3_3;

        item.result_3 = item.result_eval_3;
        delete item.result_eval_3; 
        
        item.eval4_4= item.eval_4;
        delete item.eval_4;
        item.eval_4=item.eval4_4;
        delete item.eval4_4;

        item.result_4 = item.result_eval_4;
        delete item.result_eval_4;         

        item.diae = item.dia_de_evaluacion;
        delete item.dia_de_evaluacion;
        item.dia_de_evaluacion= item.diae
        delete item.diae;

        item.fecha_creacion = item.created_at;
        delete item.created_at;

      })
      return data.data;

    }))
  }

}
