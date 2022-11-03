import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteListComponent } from './reporte-list/reporte-list.component';
import { ReporteGraphComponent } from './reporte-graph/reporte-graph.component';

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
import { ReporteRoutingModule } from './reporte-routing.module';

import { ChartsModule } from 'ng2-charts';
import { PrintReportComponent } from './modal/print-report/print-report.component';

import { PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);


@NgModule({
  declarations: [
    ReporteListComponent,
    ReporteGraphComponent,
    PrintReportComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReporteRoutingModule,
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
    ChartsModule
  ]
})
export class ReporteModule { }
