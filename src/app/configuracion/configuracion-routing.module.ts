import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
import { InformacionListComponent } from './informacion/informacion-list/informacion-list.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'departamento.list', component: DepartamentoListComponent },
      { path: 'cargo.list', component: CargoListComponent },
      { path: 'informacion.list', component: InformacionListComponent },
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

export class ConfiguracionRoutingModule { }
