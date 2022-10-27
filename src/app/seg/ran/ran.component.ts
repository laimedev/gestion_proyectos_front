import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import { SeguimientoRan } from '../domain/seguimiento-ran';
import { RanService } from '../service/ran.service'
import { DelSegInfoComponent } from '../del-seg-info/del-seg-info.component'
import { Util } from 'src/app/utils/helpers/util';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ran',
  templateUrl: './ran.component.html',
  styleUrls: ['./ran.component.scss']
})
export class RanComponent implements OnInit {

  dataSource: PaginatedDataSource<SeguimientoRan>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = ['id', 'archivo', 'celdas_ev', 'celdas_in', 'total_ev', 'fecha', 'options'];
  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  processing = false

  constructor(protected ranService: RanService,
    public overlay: CustomOverlayService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private docTitleService: Title) { }

  ngOnInit(): void {

    

    this.dataSource = new PaginatedDataSource<SeguimientoRan>(
      (request: PageRequest<SeguimientoRan>) => this.ranService.getAll(request),
      { field: 'id', order: 'desc' }, 10
    )

  }

  ngAfterViewInit(): void {

    this.docTitleService.setTitle('Seguimiento - ' + environment.appTitle)

    this.overlay.CustomCreate(this.table_.nativeElement)

    this.dataSource.loading$.subscribe((bol) => {
      if (bol) {
        this.overlay.openOverlay()
      } else {
        this.overlay?.closeOverlay()
      }

    })
  }


  export() {
    this.ranService
    .export(this.dataSource.lastFilter)
    .subscribe(
      ({data}) => Util.download(data, 'seguimiento-ran'),
      (e) => SnackbarHelper.error(this.snackBar, { msg: 'Error intentar descargar el documento', }));

  }

  downloadItem(seg: SeguimientoRan): void {
    this.ranService
    .exportItem(seg.id)
    .subscribe((data) => Util.download(data, seg.filename?.replace('.xlsx', '')),
    (e) => SnackbarHelper.error(this.snackBar, { msg: 'Error intentar descargar el documento', }));
  }

  openDelete(seg: SeguimientoRan) {

    const deleteModal = this.modalService.open(DelSegInfoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.seg = seg
    deleteModal.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  redo() {
    this.processing = true
    this.ranService.process()
    .pipe(finalize(() => this.processing=false))
    .subscribe(data => SnackbarHelper.show(this.snackBar, { msg: 'Proceso exitoso', }), 
    (e) => SnackbarHelper.error(this.snackBar, { msg: 'Error al procesar', }))
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

}
