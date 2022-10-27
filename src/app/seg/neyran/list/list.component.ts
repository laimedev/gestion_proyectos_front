import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import {NeiranService} from 'src/app/seg/service/neiran.service'
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { environment } from 'src/environments/environment';
import { ModalCreateComponent } from '../modal-create/modal-create.component';
import { NeiranCommand } from '../../domain/neiran-command';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import {ModalDeleteComponent} from '../modal-delete/modal-delete.component'
import { Util } from 'src/app/utils/helpers/util';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = ['id', 'prefix', 'mo', 'parameter', 'name_parameter', 'type_parameter', 'object', 'search_name', 'mml', 'fecha', 'options'];
  
  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });

  constructor(public overlay: CustomOverlayService,
    private snackBar: MatSnackBar,
    private modalService: NgbModal,
    private docTitleService: Title, 
    private neiranService: NeiranService) { }

  ngOnInit(): void {
    this.dataSource = new PaginatedDataSource<any>(
      (request: PageRequest<any>) => this.neiranService.getAll(request),
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

    const modalRef = this.modalService.open(ModalCreateComponent, { size: 'lg', backdrop: 'static' });

    modalRef.result.then(res => {
      this.dataSource.updateTable(0)
    })
  }

  openEdit(cmd: NeiranCommand) {
    
    const modalEdit = this.modalService.open(ModalEditComponent, {size: 'lg', backdrop: 'static'})
    modalEdit.componentInstance.cmd = cmd
    modalEdit.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  openDelete(cmd: NeiranCommand) {

    const deleteModal = this.modalService.open(ModalDeleteComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.cmd = cmd
    deleteModal.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  export(): void {
    this.neiranService
    .export(this.dataSource.lastFilter)
    .subscribe((data) => Util.download(data, 'export-comando_mml'));
  }

}
