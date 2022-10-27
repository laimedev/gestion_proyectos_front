import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
import { CargoFormComponent } from './cargo/cargo-form/cargo-form.component';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { EmpleadoFormComponent } from './empleado/empleado-form/empleado-form.component';
import { EstacionListComponent } from './estacion/estacion-list/estacion-list.component';
import { EstacionFormComponent } from './estacion/estacion-form/estacion-form.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'cargo.list', component: CargoListComponent },
      { path: 'cargo.form', component: CargoFormComponent },

      { path: 'departamento.list', component: DepartamentoListComponent },
      { path: 'departamento.form', component: DepartamentoFormComponent },

      // { path: 'empleado.list', component: EmpleadoListComponent },
      // { path: 'empleado.form', component: EmpleadoFormComponent },

      { path: 'estacion.list', component: EstacionListComponent },
      { path: 'estacion.form', component: EstacionFormComponent },
 
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
export class OrganizacionRoutingModule { }
