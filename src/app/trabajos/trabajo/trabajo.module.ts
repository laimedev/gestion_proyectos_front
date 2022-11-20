import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTrabajoComponent } from './modal/create-trabajo/create-trabajo.component';
import { DeleteTrabajoComponent } from './modal/delete-trabajo/delete-trabajo.component';
import { EditTrabajoComponent } from './modal/edit-trabajo/edit-trabajo.component';
import { ViewTrabajoComponent } from './modal/view-trabajo/view-trabajo.component';
import { TrabajoFormComponent } from './trabajo-form/trabajo-form.component';
import { TrabajoListComponent } from './trabajo-list/trabajo-list.component';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilsModule } from '../../utils/utils.module';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TrabajoRoutingModule } from './trabajo-routing.module';
import { CreateTareaComponent } from './modal/create-tarea/create-tarea.component';
import { DeleteTareaComponent } from './modal/delete-tarea/delete-tarea.component';


@NgModule({
  declarations: [
    CreateTrabajoComponent,
    DeleteTrabajoComponent,
    EditTrabajoComponent,
    ViewTrabajoComponent,
    TrabajoFormComponent,
    TrabajoListComponent,
    CreateTareaComponent,
    DeleteTareaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    TrabajoRoutingModule,
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
export class TrabajoModule { }
