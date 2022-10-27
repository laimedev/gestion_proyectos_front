import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import {ThresholdService} from 'src/app/seg/service/threshold.service'
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { environment } from 'src/environments/environment';
import { ThresholdModalCreateComponent } from '../threshold-modal-create/threshold-modal-create.component';
import { ThresholdModalEditComponent } from '../threshold-modal-edit/threshold-modal-edit.component';
import {ThresholdModalDeleteComponent} from '../threshold-modal-delete/threshold-modal-delete.component'
import { Thresholds } from '../../domain/thresholds-comand';
import { Util } from 'src/app/utils/helpers/util';


@Component({
  selector: 'app-threshold-list',
  templateUrl: './threshold-list.component.html',
  styleUrls: ['./threshold-list.component.scss']
})

export class ThresholdListComponent implements OnInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = ['id', 'flow', 'name_threshold', 'value_threshold', 'unit', 'description', 'fecha', 'options'];

  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });

  constructor(public overlay: CustomOverlayService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private docTitleService: Title, 
    private thresholdService: ThresholdService) { }

    ngOnInit(): void {
      this.dataSource = new PaginatedDataSource<any>(
        (request: PageRequest<any>) => this.thresholdService.getAll(request),
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

    openCreate(): void {

      const modalRef = this.modalService.open(ThresholdModalCreateComponent, { size: 'lg', backdrop: 'static' });
  
      modalRef.result.then(res => {
        this.dataSource.updateTable(0)
      })
    }
  
    openEdit(cmd: Thresholds) {
      
      const modalEdit = this.modalService.open(ThresholdModalEditComponent, {size: 'lg', backdrop: 'static'})
      modalEdit.componentInstance.cmd = cmd
      modalEdit.result.then(res => {
        this.dataSource.updateTable(this.paginator.pageIndex)
      })
    }
  
    openDelete(cmd: Thresholds) {
  
      const deleteModal = this.modalService.open(ThresholdModalDeleteComponent, { size: 'lg', backdrop: 'static' })
      deleteModal.componentInstance.cmd = cmd
      deleteModal.result.then(res => {
        this.dataSource.updateTable(this.paginator.pageIndex)
      })
    }
  
    export(): void {
      this.thresholdService
      .export(this.dataSource.lastFilter)
      .subscribe((data) => Util.download(data, 'export-thresholds'));
    }

}
