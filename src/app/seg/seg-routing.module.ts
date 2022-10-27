import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RanComponent } from '../seg/ran/ran.component'
import { RanInfoComponent } from '../seg/ran-info/ran-info.component'
import { ListComponent } from './neyran/list/list.component';
import { MonitoringComponent } from './neyran/monitoring/monitoring.component'
import { ThresholdListComponent } from './threshold/threshold-list/threshold-list.component';
import {CoberturaListComponent} from './cobertura/cobertura-list/cobertura-list.component';
import {CalidadListComponent} from './calidad/calidad-list/calidad-list.component';
import {CapacidadListComponent} from './capacidad/capacidad-list/capacidad-list.component'
import { MonitoreoKpiComponent } from './threshold/monitoreo-kpi/monitoreo-kpi.component';
import {ManListComponent} from './threshold/mantenimiento-kpi/man-list/man-list.component';
import {RadarListComponent} from './radar/radar-list/radar-list.component';
import {BusyhourListComponent} from './busyhour/busyhour-list/busyhour-list.component'

const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'seguimiento/:id', component: RanInfoComponent },
      { path: 'seguimiento', component: RanComponent },
      { path: 'security.neiran', component: ListComponent },
      { path: 'monitoreo.neiran', component: MonitoringComponent },
      { path: 'security.thresholds.evaluation', component: ThresholdListComponent },
      { path: 'security.kpis.thresholds', component: ManListComponent },
      { path: 'monitoreo.cobertura', component: CoberturaListComponent },
      { path: 'monitoreo.calidad', component: CalidadListComponent },
      { path: 'monitoreo.capacidad', component: CapacidadListComponent },
      { path: 'monitoreo.kpi', component: MonitoreoKpiComponent },
      { path: 'monitoreo.radar', component: RadarListComponent },
      { path: 'monitoreo.busyhour', component: BusyhourListComponent },
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegRoutingModule { }
