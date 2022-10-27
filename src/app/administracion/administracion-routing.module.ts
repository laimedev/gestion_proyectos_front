import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AuthGuard } from '../services/guard/auth.guard';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { RolListComponent } from './rol/rol-list/rol-list.component';
import { RolFormComponent } from './rol/rol-form/rol-form.component';


const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'usuario.list', component: UsuarioListComponent },
      { path: 'usuario.form', component: UsuarioFormComponent },

      { path: 'rol.list', component: RolListComponent },
      { path: 'rol.form', component: RolFormComponent },
 
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
export class AdministracionRoutingModule { }
