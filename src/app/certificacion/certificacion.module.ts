import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CertificacionRoutingModule } from './certificacion-routing.module';
import { GrupoFormComponent } from './grupo/grupo-form/grupo-form.component';
import { GrupoListComponent } from './grupo/grupo-list/grupo-list.component';
import { EntidadFormComponent } from './entidad/entidad-form/entidad-form.component';
import { EntidadListComponent } from './entidad/entidad-list/entidad-list.component';
import { CertificadoListComponent } from './certificado/certificado-list/certificado-list.component';
import { CertificadoFormComponent } from './certificado/certificado-form/certificado-form.component';
import { CampanaFormComponent } from './campana/campana-form/campana-form.component';
import { CampanaListComponent } from './campana/campana-list/campana-list.component';
import { ProcesoListComponent } from './proceso/proceso-list/proceso-list.component';
import { ProcesoFormComponent } from './proceso/proceso-form/proceso-form.component';
import { ProgramaListComponent } from './programa/programa-list/programa-list.component';
import { ProgramaFormComponent } from './programa/programa-form/programa-form.component';
import { PropiedadFormComponent } from './propiedad/propiedad-form/propiedad-form.component';
import { PropiedadListComponent } from './propiedad/propiedad-list/propiedad-list.component';
import { UnidadListComponent } from './unidad/unidad-list/unidad-list.component';
import { UnidadFormComponent } from './unidad/unidad-form/unidad-form.component';



@NgModule({
  declarations: [
  
    GrupoFormComponent,
       GrupoListComponent,
       EntidadFormComponent,
       EntidadListComponent,
       CertificadoListComponent,
       CertificadoFormComponent,
       CampanaFormComponent,
       CampanaListComponent,
       ProcesoListComponent,
       ProcesoFormComponent,
       ProgramaListComponent,
       ProgramaFormComponent,
       PropiedadFormComponent,
       PropiedadListComponent,
       UnidadListComponent,
       UnidadFormComponent,
  ],
  imports: [
    CommonModule,
    CertificacionRoutingModule
  ]
})
export class CertificacionModule { }
