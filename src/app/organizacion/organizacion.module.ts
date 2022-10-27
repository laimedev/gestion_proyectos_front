import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizacionRoutingModule } from './organizacion-routing.module';
import { CargoFormComponent } from './cargo/cargo-form/cargo-form.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { EmpleadoFormComponent } from './empleado/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { EstacionFormComponent } from './estacion/estacion-form/estacion-form.component';
import { EstacionListComponent } from './estacion/estacion-list/estacion-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    CargoFormComponent,
    CargoListComponent,
    DepartamentoFormComponent,
    DepartamentoListComponent,
    EmpleadoFormComponent,
    EmpleadoListComponent,
    EstacionFormComponent,
    EstacionListComponent
  ],
  imports: [
    CommonModule,
    OrganizacionRoutingModule,
    ReactiveFormsModule,
    BrowserModule

  ]
})
export class OrganizacionModule { }
