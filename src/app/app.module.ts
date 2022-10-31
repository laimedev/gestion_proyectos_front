import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HomeModule} from './home/home.module'
import {LoginModule} from './login/login.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {SecurityModule} from './security/security.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {JwtTokenInterceptor} from './services/interceptors/jwt-token-interceptor'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UtilsModule } from './utils/utils.module';

import {SegModule} from './seg/seg.module'
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { MantenimientoModule } from './mantenimiento/mantenimiento.module';
import { ProyectoModule } from './proyectos/proyecto.module';
import { EmpleadoModule } from './empleados/empleado.module';
import { TrabajoModule } from './trabajos/trabajo/trabajo.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';


import { OrganizacionModule } from './organizacion/organizacion.module';
import { AdministracionModule } from './administracion/administracion.module';
import { CertificacionModule } from './certificacion/certificacion.module';
import { UnproductivaModule } from './unproductiva/unproductiva.module';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    LoginModule,
    SegModule,
    AdministracionModule,
    UnproductivaModule,
    MaintenanceModule,
    MantenimientoModule,
    ProyectoModule,
    EmpleadoModule,
    TrabajoModule,
    ConfiguracionModule,
    OrganizacionModule,
    CertificacionModule,
    SecurityModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    UtilsModule
  ],
  providers: [
    Title,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy,}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
