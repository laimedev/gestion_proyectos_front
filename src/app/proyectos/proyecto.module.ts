import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProyectoListComponent } from './proyecto/proyecto-list/proyecto-list.component';
import { DeleteProyectoComponent } from './proyecto/modal/delete-proyecto/delete-proyecto.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ProyectoRoutingModule } from './proyecto-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../utils/utils.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CreateProyectoComponent } from './proyecto/modal/create-proyecto/create-proyecto.component';
import { EditProyectoComponent } from './proyecto/modal/edit-proyecto/edit-proyecto.component';
import { ProyectoFormComponent } from './proyecto/proyecto-form/proyecto-form.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { CreateClienteComponent } from './cliente/modal/create-cliente/create-cliente.component';
import { DeleteClienteComponent } from './cliente/modal/delete-cliente/delete-cliente.component';
import { EditClienteComponent } from './cliente/modal/edit-cliente/edit-cliente.component';
import { ViewClienteComponent } from './cliente/modal/view-cliente/view-cliente.component';
import { MisProyectosListComponent } from './proyecto/mis-proyectos-list/mis-proyectos-list.component';
import { CreateReportComponent } from './proyecto/modal/create-report/create-report.component';
import { ViewProyectoComponent } from './proyecto/modal/view-proyecto/view-proyecto.component';


@NgModule({
  declarations: [
    ProyectoListComponent,
    DeleteProyectoComponent,
    CreateProyectoComponent,
    EditProyectoComponent,
    ProyectoFormComponent,
    ClienteFormComponent,
    ClienteListComponent,
    CreateClienteComponent,
    DeleteClienteComponent,
    EditClienteComponent,
    ViewClienteComponent,
    MisProyectosListComponent,
    CreateReportComponent,
    ViewProyectoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ProyectoRoutingModule,
    ReactiveFormsModule,

   
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    UtilsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatPaginatorModule,
    NgbModule,

  ]
})
export class ProyectoModule { }
