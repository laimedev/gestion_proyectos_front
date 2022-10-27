import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { Util } from 'src/app/utils/helpers/util';
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import { environment } from 'src/environments/environment';
import { ThresholdsKpiService } from '../../service/thresholds-kpi.service';

@Component({
  selector: 'app-monitoreo-kpi',
  templateUrl: './monitoreo-kpi.component.html',
  styleUrls: ['./monitoreo-kpi.component.scss']
})
export class MonitoreoKpiComponent implements OnInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = ['id', 'cell_name','gral_result', 'eval_1', 'result_eval_1',
  'eval_2', 'result_eval_2', 'eval_3', 'result_eval_3', 'eval_4', 'result_eval_4',
  'dia_de_evaluacion', 'created_at'];

  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });


  constructor(public overlay: CustomOverlayService,
    private modalService: NgbModal,
    private docTitleService: Title, 
    private thresholdsKpiService: ThresholdsKpiService) { }

    ngAfterViewInit(): void {
      this.docTitleService.setTitle('KPI - ' + environment.appTitle)
  
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
        (request: PageRequest<any>) => this.thresholdsKpiService.monitoreo(request),
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

    export(): void {
      this.thresholdsKpiService
      .monitoreoExport(this.dataSource.lastFilter)
      .subscribe((data) => Util.download(data, 'export-monitoreo_evaluacion_kpis'));
    }

}
