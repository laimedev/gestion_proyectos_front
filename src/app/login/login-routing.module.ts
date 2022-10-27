import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component'
import { HeaderLoginComponent } from './header-login/header-login.component';
import { SideLoginComponent } from './side-login/side-login.component';


const routes: Routes = [
  {path: 'login', children: [
    {path: '', component: LoginComponent},
    { path: '', component: HeaderLoginComponent, outlet: 'header' },
      { path: '', component: SideLoginComponent, outlet: 'sidebar' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
