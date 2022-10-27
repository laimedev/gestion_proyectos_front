import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import {CapacidadService} from 'src/app/seg/service/capacidad.service'
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/utils/helpers/util';

@Component({
  selector: 'app-capacidad-list',
  templateUrl: './capacidad-list.component.html',
  styleUrls: ['./capacidad-list.component.scss']
})
export class CapacidadListComponent implements OnInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = 
  ['id', 'proyecto', 'tipo_de_celda', 'cell_name', 'co_cell_name','vecino_cell_name', 
  'banda_cell', 'banda_cocell','banda_vecino','nombre_de_sitio','frb','th_cell',
  'th_cocell','th_vecino','az_cell','az_cocell','az_vecino','cio','set_number','eval_control',
  'result','created_at'];
 
   dateRange = new FormGroup({
     start: new FormControl('', [Validators.required]),
     end: new FormControl('', [Validators.required])
   });
  constructor(public overlay: CustomOverlayService,
    private docTitleService: Title, 
    private capacidadService: CapacidadService) { }

  ngOnInit(): void {
    this.dataSource = new PaginatedDataSource<any>(
      (request: PageRequest<any>) => this.capacidadService.getAll(request),
      { field: 'id', order: 'desc' }, 10
    )
  }

  ngAfterViewInit(): void {

    this.docTitleService.setTitle('Monitoreo - ' + environment.appTitle)
    this.overlay.CustomCreate(this.table_.nativeElement)

    this.dataSource.loading$.subscribe((bol) => {
      if (bol) {
        this.overlay.openOverlay()
      } else {
        this.overlay?.closeOverlay()
      }

    })
  }

  search() {

    if (this.dateRange.valid) {
      
      let start = new Date(Date.parse(this.dateRange.get('start').value))
      let end = new Date(Date.parse(this.dateRange.get('end').value))
      //------------------------------------------------------------------

      let startStr = new Intl.DateTimeFormat('es-PE', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(start) + ' 00:00:00'
      let endStr = new Intl.DateTimeFormat('es-PE', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(end) + ' 23:59:59'

      let filters = [
        { field: 'createdAt', value: startStr, operator: 'gte' },
        { field: 'createdAt', value: endStr, operator: 'lte' }
      ]

      this.dataSource.filterInput(filters)

    } else {
      console.log('Not valid');

    }
  }

  export(): void {
    this.capacidadService
    .export(this.dataSource.lastFilter)
    .subscribe((data) => Util.download(data, 'export-monitoreo_flujo_capacidad'));
  }

}
