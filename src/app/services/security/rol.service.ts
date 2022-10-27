import { Injectable } from '@angular/core';
import { Rol } from '../../entities/security/rol';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';
import { PageRequest, Page } from 'src/app/utils/paginator/page-utils';
import { Permissions } from 'src/app/entities/security/permissions';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(protected client: HttpClient) { }

  saveRol(rol: Rol): Observable<Rol> {

    return this.client.post<Rol>(environment.baseUrl + '/security/roles', rol)
  }

  getById(rol: Rol): Observable<Rol> {

    return this.client.get<Rol>(environment.baseUrl + '/security/roles/' + rol.id)
  }

  editRol(rol: Rol): Observable<Rol> {

    return this.client.put<Rol>(environment.baseUrl + '/security/roles/' + rol.id, rol);
  }

  getAll(request: PageRequest<Rol>): Observable<Page<Rol>> {

    const params = new HttpParams().set('json', JSON.stringify(request));
    return this.client.get<Page<Rol>>(environment.baseUrl + '/security/roles', { params })
  }

  delete(rol:Rol): Observable<Rol> {

    return this.client.delete<Rol>(environment.baseUrl + '/security/roles/' + rol.id)

  }

  onlyIds(permissions: Permissions[]): number[] {

    if (!Array.isArray(permissions))
      return []

    return permissions.map(p => p.id)

  }

  public export(filter: PageRequest<Rol>): Observable<any> {       
    return this.client.post(`${environment.baseUrl}/security/export/roles`, filter)
  }

}
