import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FooterLoginComponent } from './footer-login/footer-login.component';
// import { HeaderLoginComponent } from './header-login/header-login.component';
import { SideLoginComponent } from './side-login/side-login.component';
import { UtilsModule } from '../utils/utils.module';


@NgModule({
  declarations: [LoginComponent, FooterLoginComponent, SideLoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    UtilsModule

  ]
})
export class LoginModule { }
