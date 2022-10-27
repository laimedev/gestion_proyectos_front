import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import { PageRequest, Page, filterDescriptor } from '../../utils/paginator/page-utils';
import { SeguimientoRan } from '../domain/seguimiento-ran';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RanService {

  constructor(protected client: HttpClient) { }

  getAll(request: PageRequest<SeguimientoRan>): Observable<Page<SeguimientoRan>> {

    const params = new HttpParams().set('json', JSON.stringify(request));

    return this.client.get<Page<SeguimientoRan>>(`${environment.baseUrl}/seguimiento/ram`, { params })

  }

  getById(segRanId: number): Observable<SeguimientoRan> {

    return this.client.get<SeguimientoRan>(`${environment.baseUrl}/seguimiento/ram/${segRanId}`)
  }

  delete(segRan: SeguimientoRan): Observable<SeguimientoRan> {
    return this.client.delete<SeguimientoRan>(`${environment.baseUrl}/seguimiento/ram/${segRan.id}`)
  }

  process(): Observable<any> {
    return this.client.post<SeguimientoRan>(`${environment.baseUrl}/seguimiento/reprocesar/ram`, {})
  }

  public export(filter: PageRequest<SeguimientoRan>): Observable<any> {
    return this.client
      .post(`${environment.baseUrl}/seguimiento/export/ram`, filter)
      .pipe(map((whyMe: any) => {
        let data = whyMe?.data || []
        data = data.map(({ id,
          filename,
          celdas_evaluadas,
          celdas_derivadas,
          celdas_number,
          created_at }) => {
          return {
            id,
            archivo_seguimiento: filename,
            celdas_evaluadas,
            celdas_derivadas,
            total_celdas: celdas_number,
            fecha_creacion: created_at
          }
        });
        return { ...whyMe, data }
      }))

  }

  public exportItem(id: number): Observable<any> {
    return this.client
      .get(`${environment.baseUrl}/seguimiento/download/ram/${id}`)
      .pipe(map((whyMe2: any) => {
        let data = whyMe2 ?? []
        data = data.map((i: any) => {
          return {
            Proyecto: i["Proyecto"],
            "Año": i["Anio"],
            "ID de sitio": i["ID de sitio"],
            "Nombre de sitio": i["Nombre de sitio"],
            "Celda": i["Celda"],
            "Tipo celda": i["Tipo celda"],
            "Sector": i["Sector"],
            "Tecnología": i["Tecnología"],
            "Tipo de solución": i["Tipo de solución"],
            "Estado de Proyecto": i["Estado de Proyecto"],
            "Servicio": i["Servicio"],
            "Fecha OnAir": i["Fecha OnAir"],
            "Fecha de Activación": i["Fecha de Activación"],
            "Día Evaluación": i["Día Evaluación"]}
        });
        return data
      }))
  }

}
