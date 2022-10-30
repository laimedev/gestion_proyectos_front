import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../services/guard/auth.guard';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { TrabajoListComponent } from './trabajo-list/trabajo-list.component';
const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'trabajo.list', component: TrabajoListComponent },
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

export class TrabajoRoutingModule { }
