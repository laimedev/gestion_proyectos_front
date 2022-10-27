import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ListComponent } from './producer/list/list.component';
import { FormProducerComponent } from './producer/form-producer/form-producer.component';
import { VpnRequestComponent } from './redes/vpn/vpn-request/vpn-request.component';
import { VpnFormComponent } from './redes/vpn/vpn-form/vpn-form.component';
import { ListPropertyComponent } from './property/list-property/list-property.component';
import { FormPropertyComponent } from './property/form-property/form-property.component';
import { GeoComponent } from './property/geo/geo.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'producer.list', component: ListComponent },
      { path: 'producer.form/:id', component: FormProducerComponent },

      { path: 'property.list', component: ListPropertyComponent },
      { path: 'property.form/:id', component: FormPropertyComponent },
      { path: 'property.geo/:id', component: GeoComponent },


      { path: 'vpn.request', component: VpnRequestComponent },
      { path: 'vpn.form', component: VpnFormComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' }
    ]
  },
];


@NgModule({
  // declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class MaintenanceRoutingModule { }
