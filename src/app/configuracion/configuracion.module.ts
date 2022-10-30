import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ConfiguracionRoutingModule } from './configuracion-routing.module';


import { BrowserModule } from '@angular/platform-browser';
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
import { MatInputModule } from '@angular/material/input';
import { InformacionFormComponent } from './informacion/informacion-form/informacion-form.component';
import { InformacionListComponent } from './informacion/informacion-list/informacion-list.component';
import { DepartamentoListComponent } from './departamento/departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './departamento/departamento-form/departamento-form.component';
import { CargoFormComponent } from './cargo/cargo-form/cargo-form.component';
import { CargoListComponent } from './cargo/cargo-list/cargo-list.component';
import { CreateCargoComponent } from './cargo/modal/create-cargo/create-cargo.component';
import { DeleteCargoComponent } from './cargo/modal/delete-cargo/delete-cargo.component';
import { EditCargoComponent } from './cargo/modal/edit-cargo/edit-cargo.component';
import { ViewCargoComponent } from './cargo/modal/view-cargo/view-cargo.component';
import { ViewDepartamentoComponent } from './departamento/modal/view-departamento/view-departamento.component';
import { EditDepartamentoComponent } from './departamento/modal/edit-departamento/edit-departamento.component';
import { DeleteDepartamentoComponent } from './departamento/modal/delete-departamento/delete-departamento.component';
import { CreateDepartamentoComponent } from './departamento/modal/create-departamento/create-departamento.component';
import { CreateInformacionComponent } from './informacion/modal/create-informacion/create-informacion.component';
import { EditInformacionComponent } from './informacion/modal/edit-informacion/edit-informacion.component';
import { DeleteInformacionComponent } from './informacion/modal/delete-informacion/delete-informacion.component';
import { ViewInformacionComponent } from './informacion/modal/view-informacion/view-informacion.component';


@NgModule({
  declarations: [
    InformacionFormComponent,
    InformacionListComponent,
    DepartamentoListComponent,
    DepartamentoFormComponent,
    CargoFormComponent,
    CargoListComponent,
    CreateCargoComponent,
    DeleteCargoComponent,
    EditCargoComponent,
    ViewCargoComponent,
    ViewDepartamentoComponent,
    EditDepartamentoComponent,
    DeleteDepartamentoComponent,
    CreateDepartamentoComponent,
    CreateInformacionComponent,
    EditInformacionComponent,
    DeleteInformacionComponent,
    ViewInformacionComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ConfiguracionRoutingModule,
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
export class ConfiguracionModule { }
