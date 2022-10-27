import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Kpi } from 'src/app/entities/security/kpi';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { KpiService } from 'src/app/services/security/kpi.service';
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import { DeleteKpiComponent } from '../modal/delete-kpi/delete-kpi.component';
import { CreateKpiComponent } from '../modal/create-kpi/create-kpi.component';
import { EditKpiComponent } from '../modal/edit-kpi/edit-kpi.component';
import { Util } from 'src/app/utils/helpers/util';

@Component({
  selector: 'app-kpis-list',
  templateUrl: './kpis-list.component.html',
  styleUrls: ['./kpis-list.component.scss']
})
export class KpisListComponent implements OnInit, AfterViewInit {

  
  displayedColumns: string[] = ['kpi', 'contador_radar', 'contador_huawei','createdAt','options'];
  dataSource: PaginatedDataSource<Kpi>

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private modalService: NgbModal, 
    private kpiService: KpiService,
    public overlay: CustomOverlayService) { }

  ngOnInit(): void {
    this.dataSource = new PaginatedDataSource<Kpi>(
      (request: PageRequest<Kpi>) => this.kpiService.getAll(request),
      { field: 'id', order: 'desc' }, 10
    )   
    
  }

  
  ngAfterViewInit(): void {
    
    this.overlay.CustomCreate(this.table_.nativeElement)

    this.dataSource.loading$.subscribe((bol) => {
      if (bol) {
        this.overlay.openOverlay()
      } else {
        this.overlay?.closeOverlay()
      }
      console.log('loading: ' + bol);
      
    })
  }

openInfo(kpi: Kpi){
  console.log(kpi);
}

openDelete(kpi: Kpi) {
    const deleteModal = this.modalService.open(DeleteKpiComponent, {size: 'lg', backdrop: 'static'})
    deleteModal.componentInstance.kpi = kpi
    deleteModal.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })
  }

   openCreate(): void {

    const modalRef = this.modalService.open(CreateKpiComponent, { size: 'lg', backdrop: 'static' });

    modalRef.result.then(res => {
      this.dataSource.updateTable(0)
    })
  }

   openEdit(kpi: Kpi) {
    
    const modalEdit = this.modalService.open(EditKpiComponent, {size: 'lg', backdrop: 'static'})
    modalEdit.componentInstance.kpi = kpi
    modalEdit.result.then(res => {
      this.dataSource.updateTable(this.paginator.pageIndex)
    })


  }

  
  search() {

    if (this.dateRange.valid) {
      
      let start = new Date(Date.parse(this.dateRange.get('start').value))
      let end = new Date(Date.parse(this.dateRange.get('end').value))

      console.log(start);
      //------------------------------------------------------------------

      let startStr = new Intl.DateTimeFormat('es-PE',{month:'2-digit',day:'2-digit', year:'numeric'}).format(start) + ' 00:00:00'
      let endStr = new Intl.DateTimeFormat('es-PE',{month:'2-digit',day:'2-digit', year:'numeric'}).format(end) + ' 23:59:59'

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
    this.kpiService
    .export(this.dataSource.lastFilter)
    .subscribe((data) => Util.download(data, 'export-kpis'));
  }

}
