import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionRoutingModule } from './administracion-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RolFormComponent } from './rol/rol-form/rol-form.component';
import { RolListComponent } from './rol/rol-list/rol-list.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';



@NgModule({
  declarations: [
    RolFormComponent,
    RolListComponent,
    UsuarioFormComponent,
    UsuarioListComponent,
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    ReactiveFormsModule,
    BrowserModule
  ]
})
export class AdministracionModule { }
