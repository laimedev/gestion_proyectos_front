import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef, HostListener, ViewContainerRef } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CreateRolComponent } from '../modal/create-rol/create-rol.component';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditRolComponent } from '../modal/edit-rol/edit-rol.component';
import { Rol } from 'src/app/entities/security/rol';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source'
import { MatPaginator } from '@angular/material/paginator';
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { RolService } from 'src/app/services/security/rol.service';
import { ViewRolComponent } from '../modal/view-rol/view-rol.component';
import { DeleteRolComponent } from '../modal/delete-rol/delete-rol.component';
import { ComponentPortal } from '@angular/cdk/portal';

import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service'
import { distinctUntilChanged } from 'rxjs/operators';
import { Util } from 'src/app/utils/helpers/util';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';






@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.scss']
})
export class RolListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['displayName', 'description', 'createdAt', 'options'];
  dataSource: PaginatedDataSource<Rol>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild('tmr') table_: ElementRef
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  //overlayRef: OverlayRef

  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });

  constructor(
    private modalService: NgbModal,
    private rolService: RolService,
    public overlay: CustomOverlayService,
    private docTitleService: Title) { }

  ngAfterViewInit(): void {

    this.overlay.CustomCreate(this.table_.nativeElement)

    this.dataSource.loading$.subscribe((bol) => {
      if (bol) {
        this.overlay.openOverlay()
      } else {
        this.overlay?.closeOverlay()
      }

      //console.log('loading: ' + bol);

    })
  }

  ngOnInit() {
    this.docTitleService.setTitle('Roles - ' + environment.appTitle)
    this.dataSource = new PaginatedDataSource<Rol>(
      (request: PageRequest<Rol>) => this.rolService.getAll(request),
      { field: 'id', order: 'desc' }, 10
    )

  }



  openDialog(): void {

    const modalRef = this.modalService.open(CreateRolComponent, { size: 'lg' });

    modalRef.result.then(res => {
      if (res)
        this.dataSource.updateTable(this.paginator.pageIndex)
    })

  }

  export() {
    this.rolService
    .export(this.dataSource.lastFilter)
    .subscribe(({data}) => Util.download(data, 'perfiles'));

  }



  openInfo(rol: Rol) {

    const modalInfo = this.modalService.open(ViewRolComponent, { size: 'lg', backdrop: 'static' })
    modalInfo.componentInstance.rol = rol
    modalInfo.result.then(res => {

    })

  }

  openEdit(rol: Rol) {
    //e.preventDefault()

    const modalEdit = this.modalService.open(EditRolComponent, { size: 'lg', backdrop: 'static', })
    modalEdit.componentInstance.rol = rol
    modalEdit.result.then(res => {
      if (res)
        this.dataSource.updateTable(this.paginator.pageIndex)
    })


  }

  openDelete(rol: Rol) {

    const deleteModal = this.modalService.open(DeleteRolComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.rol = rol
    deleteModal.result.then(res => {
      if (res)
        this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

  search() {

    if (this.dateRange.valid) {
      /**
       * Not needed but just to be sure
       */
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
