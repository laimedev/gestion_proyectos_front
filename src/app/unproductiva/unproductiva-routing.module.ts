import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../services/guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { VariedadFormComponent } from './variedad/variedad-form/variedad-form.component';
import { VariedadListComponent } from './variedad/variedad-list/variedad-list.component';
import { PendienteListComponent } from './pendiente/pendiente-list/pendiente-list.component';
import { PendienteFormComponent } from './pendiente/pendiente-form/pendiente-form.component';
import { CultivoListComponent } from './cultivo/cultivo-list/cultivo-list.component';
import { CultivoFormComponent } from './cultivo/cultivo-form/cultivo-form.component';
import { TipoareaListComponent } from './tipoarea/tipoarea-list/tipoarea-list.component';
import { TipoareaFormComponent } from './tipoarea/tipoarea-form/tipoarea-form.component';
import { AreaListComponent } from './area/area-list/area-list.component';
import { AreaFormComponent } from './area/area-form/area-form.component';
import { PropiedadListComponent } from './propiedad/propiedad-list/propiedad-list.component';
import { PropiedadFormComponent } from './propiedad/propiedad-form/propiedad-form.component';
import { ProductorListComponent } from './productor/productor-list/productor-list.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'productor.list', component: ProductorListComponent },
      { path: 'productor.form', component: ProductorListComponent },

      { path: 'propiedad.list', component: PropiedadListComponent },
      { path: 'propiedad.form', component: PropiedadFormComponent },

      { path: 'area.list', component: AreaListComponent },
      { path: 'area.form', component: AreaFormComponent },

      { path: 'tipoarea.list', component: TipoareaListComponent },
      { path: 'tipoarea.form', component: TipoareaFormComponent },

      { path: 'cultivo.list', component: CultivoListComponent },
      { path: 'cultivo.form', component: CultivoFormComponent },

      { path: 'pendiente.list', component: PendienteListComponent },
      { path: 'pendiente.form', component: PendienteFormComponent },

      { path: 'variedad.list', component: VariedadListComponent },
      { path: 'variedad.form', component: VariedadFormComponent },

 
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
export class UnproductivaRoutingModule { }
