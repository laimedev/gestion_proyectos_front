import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SegRoutingModule } from './seg-routing.module';
import { RanComponent } from './ran/ran.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { UtilsModule } from '../utils/utils.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RanInfoComponent } from './ran-info/ran-info.component';
import { RanInfoTablaComponent } from './ran-info-tabla/ran-info-tabla.component';
import { DelSegInfoComponent } from './del-seg-info/del-seg-info.component';
import { ListComponent } from './neyran/list/list.component';
import { ModalCreateComponent } from './neyran/modal-create/modal-create.component';
import { FormNeiranComponent } from './neyran/form-neiran/form-neiran.component';
import { ModalEditComponent } from './neyran/modal-edit/modal-edit.component';
import { ModalDeleteComponent } from './neyran/modal-delete/modal-delete.component';
import { MonitoringComponent } from './neyran/monitoring/monitoring.component';
import { ThresholdListComponent } from './threshold/threshold-list/threshold-list.component';
import { ThresholdFormComponent } from './threshold/threshold-form/threshold-form.component';
import { ThresholdModalCreateComponent } from './threshold/threshold-modal-create/threshold-modal-create.component';
import { ThresholdModalDeleteComponent } from './threshold/threshold-modal-delete/threshold-modal-delete.component';
import { ThresholdModalEditComponent } from './threshold/threshold-modal-edit/threshold-modal-edit.component';
import { CoberturaListComponent } from './cobertura/cobertura-list/cobertura-list.component';
import { CapacidadListComponent } from './capacidad/capacidad-list/capacidad-list.component';
import { CalidadListComponent } from './calidad/calidad-list/calidad-list.component';
import { MonitoreoKpiComponent } from './threshold/monitoreo-kpi/monitoreo-kpi.component';
import { ManListComponent } from './threshold/mantenimiento-kpi/man-list/man-list.component';
import { ManFormComponent } from './threshold/mantenimiento-kpi/man-form/man-form.component';
import { ManModalCreateComponent } from './threshold/mantenimiento-kpi/man-modal-create/man-modal-create.component';
import { ManModalDeleteComponent } from './threshold/mantenimiento-kpi/man-modal-delete/man-modal-delete.component';
import { ManModalEditComponent } from './threshold/mantenimiento-kpi/man-modal-edit/man-modal-edit.component';
import { RadarListComponent } from './radar/radar-list/radar-list.component';
import { BusyhourListComponent } from './busyhour/busyhour-list/busyhour-list.component';
//import { FormComponent } from './threshold/threshold-form/threshold-form.component';
//import { ThresholdListComponent } from './threshold/threshold-list/threshold-list.component';
//import { FormThresholdComponent } from './threshold/form-threshold/form-threshold.component';
//import { ModalCreateThresholdComponent } from './threshold/modal-create-threshold/modal-create-threshold.component';
//import { ModalEditThresholdComponent } from './threshold/modal-edit-threshold/modal-edit-threshold.component';
//import { ModalDeleteThresholdComponent } from './threshold/modal-delete-threshold/modal-delete-threshold.component';
//import { MonitoreoKpiComponent } from './threshold/monitoreo-kpi/monitoreo-kpi.component';


@NgModule({
  declarations: [
    RanComponent,
    RanInfoComponent,
    RanInfoTablaComponent,
    DelSegInfoComponent,
    ListComponent,
    ModalCreateComponent,
    FormNeiranComponent,
    ModalEditComponent,
    ModalDeleteComponent,
    MonitoringComponent,
    ThresholdListComponent,
    ThresholdFormComponent,
    ThresholdModalCreateComponent,
    ThresholdModalDeleteComponent,
    ThresholdModalEditComponent,
    CoberturaListComponent,
    CapacidadListComponent,
    CalidadListComponent,
    MonitoreoKpiComponent,
    ManListComponent,
    ManFormComponent,
    ManModalCreateComponent,
    ManModalDeleteComponent,
    ManModalEditComponent,
    RadarListComponent,
    BusyhourListComponent,
    //FormComponent,
    //ThresholdListComponent,
    //FormThresholdComponent,
    //ModalCreateThresholdComponent,
    //ModalEditThresholdComponent,
    //ModalDeleteThresholdComponent,
    //MonitoreoKpiComponent
  ],
  imports: [
    CommonModule,
    SegRoutingModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatNativeDateModule,
    UtilsModule,
    MatDialogModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ]
})
export class SegModule { }
