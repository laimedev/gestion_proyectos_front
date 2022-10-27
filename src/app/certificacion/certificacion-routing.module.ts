import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { GrupoListComponent } from './grupo/grupo-list/grupo-list.component';
import { GrupoFormComponent } from './grupo/grupo-form/grupo-form.component';
import { UnidadListComponent } from './unidad/unidad-list/unidad-list.component';
import { UnidadFormComponent } from './unidad/unidad-form/unidad-form.component';
import { ProcesoListComponent } from './proceso/proceso-list/proceso-list.component';
import { ProcesoFormComponent } from './proceso/proceso-form/proceso-form.component';
import { CertificadoListComponent } from './certificado/certificado-list/certificado-list.component';
import { CertificadoFormComponent } from './certificado/certificado-form/certificado-form.component';
import { CampanaListComponent } from './campana/campana-list/campana-list.component';
import { CampanaFormComponent } from './campana/campana-form/campana-form.component';
import { ProgramaListComponent } from './programa/programa-list/programa-list.component';
import { ProgramaFormComponent } from './programa/programa-form/programa-form.component';
import { EntidadListComponent } from './entidad/entidad-list/entidad-list.component';
import { EntidadFormComponent } from './entidad/entidad-form/entidad-form.component';
import { PropiedadListComponent } from './propiedad/propiedad-list/propiedad-list.component';
import { PropiedadFormComponent } from './propiedad/propiedad-form/propiedad-form.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';



const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'grupo.list', component: GrupoListComponent },
      { path: 'grupo.form', component: GrupoFormComponent },

      { path: 'unidad.list', component: UnidadListComponent },
      { path: 'unidad.form', component: UnidadFormComponent },

      { path: 'proceso.list', component: ProcesoListComponent },
      { path: 'proceso.form', component: ProcesoFormComponent },

      { path: 'certificado.list', component: CertificadoListComponent },
      { path: 'certificado.form', component: CertificadoFormComponent },

      { path: 'campana.list', component: CampanaListComponent },
      { path: 'campana.form', component: CampanaFormComponent },

      { path: 'programa.list', component: ProgramaListComponent },
      { path: 'programa.form', component: ProgramaFormComponent },

      { path: 'entidad.list', component: EntidadListComponent },
      { path: 'entidad.form', component: EntidadFormComponent },

      { path: 'propiedad.list', component: PropiedadListComponent },
      { path: 'propiedad.form', component: PropiedadFormComponent },

 
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' }
    ]
  },
];




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CertificacionRoutingModule { }
