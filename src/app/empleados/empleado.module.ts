import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpleadoFormComponent } from './empleado/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado/empleado-list/empleado-list.component';
import { CreateEmpleadoComponent } from './empleado/modal/create-empleado/create-empleado.component';
import { EditEmpleadoComponent } from './empleado/modal/edit-empleado/edit-empleado.component';
import { DeleteEmpleadoComponent } from './empleado/modal/delete-empleado/delete-empleado.component';
import { ViewEmpleadoComponent } from './empleado/modal/view-empleado/view-empleado.component';


import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UtilsModule } from '../utils/utils.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';

import { EmpleadoRoutingModule } from './empleado-routing.module';



@NgModule({
  declarations: [
    EmpleadoFormComponent,
    EmpleadoListComponent,
    CreateEmpleadoComponent,
    EditEmpleadoComponent,
    DeleteEmpleadoComponent,
    ViewEmpleadoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    EmpleadoRoutingModule,
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
export class EmpleadoModule { }
