import { AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import { ThresholdsKpiService } from '../../../service/thresholds-kpi.service'
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/utils/helpers/util';
import { ManModalEditComponent } from '../man-modal-edit/man-modal-edit.component';
import { ManModalCreateComponent } from  '../man-modal-create/man-modal-create.component';
import { ManModalDeleteComponent } from '../man-modal-delete/man-modal-delete.component';
import {ThresholdTable} from  '../../../domain/threshold.table'

@Component({
  selector: 'app-man-list',
  templateUrl: './man-list.component.html',
  styleUrls: ['./man-list.component.scss']
})

export class ManListComponent implements OnInit, AfterViewInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = ['id', 'kpi','kpi_unit', 'banda', 'poligono', 'n_cond', 
  'source_1_value', 'source_1_criterio', 'ref_1_value', 'source_2_value',
  'source_2_criterio', 'ref_2_value', 'source_3_value', 'source_3_criterio',
  'ref_3_value', 'source_4_value', 'source_4_criterio', 'ref_4_value','created_at',  'options'];
  
  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });

  constructor(public overlay: CustomOverlayService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private docTitleService: Title, 
    private thresholdsKpiService: ThresholdsKpiService) { }


  ngAfterViewInit(): void {
    this.docTitleService.setTitle('Threshold - ' + environment.appTitle)

    this.overlay.CustomCreate(this.table_.nativeElement)

    this.dataSource.loading$.subscribe((bol) => {
      if (bol) {
        this.overlay.openOverlay()
      } else {
        this.overlay?.closeOverlay()
      }

    })
  }

  ngOnInit(): void {
    this.dataSource = new PaginatedDataSource<any>(
      (request: PageRequest<any>) => this.thresholdsKpiService.getAll(request),
      { field: 'id', order: 'desc' }, 10
    )
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

  openCreate(): void {

    const modalRef = this.modalService.open(ManModalCreateComponent, { size: 'lg', backdrop: 'static' });

    modalRef.result.then(res => {
      this.dataSource.updateTable(0)
    })
  }

  openEdit(thre: any) {

    const modalEdit = this.modalService.open(ManModalEditComponent, {size: 'lg', backdrop: 'static'})
    modalEdit.componentInstance.thre = thre
    modalEdit.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  openDelete(thre: any) {

    const deleteModal = this.modalService.open(ManModalDeleteComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.th = thre
    deleteModal.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  export(): void {
    this.thresholdsKpiService
    .export(this.dataSource.lastFilter)
    .subscribe((data) => Util.download(data, 'export-kpis_thresholds'));
  }

}
