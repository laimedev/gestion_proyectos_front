import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from '../header/header.component'
import {SidebarComponent} from '../sidebar/sidebar.component'
import {UserListComponent} from './user/user-list/user-list.component'
import {RolListComponent} from './roles/rol-list/rol-list.component'
import {AuthGuard} from 'src/app/services/guard/auth.guard'
import { KpisListComponent } from './kpis/kpis-list/kpis-list.component';

const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'security.users', component: UserListComponent },
      { path: 'security.roles', component: RolListComponent},
      { path: 'security.kpis', component: KpisListComponent},
      { path: '', component: HeaderComponent, outlet: 'header' },
      { path: '', component: SidebarComponent, outlet: 'sidebar' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
