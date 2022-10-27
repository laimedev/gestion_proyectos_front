import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import { NeiranMonitoreoService } from '../../service/neiran-monitoreo.service';
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/utils/helpers/util';



@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
  displayedColumns: string[] = ['id', 'nombre_de_sitio', 'celda', 'local_cell_id', 
  'cell_cellradius', 'cell_freqband', 'cell_txrxmode', 'retsubunit_tilt', 
  'retdevicedata_tiltmax', 'retdevicedata_tiltmin', 
  'pdschcfg_referencesignalpwr', 'pdschcfg_pb', 'celldlpcpdschpa_papcoff',
  'cellchpwrcfg_pcfichpwr', 'cellchpwrcfg_pbchpwr','cellchpwrcfg_schpwr',
  'cellchpwrcfg_dbchpwr','cellchpwrcfg_pchpwr','cellchpwrcfg_rarsppwr',
  'cellchpwrcfg_prspwr','celldlpcpdcch_dedidcipwroffset','celldlpcphich_pwroffset',
  'eutranintrafreqncell_cellindividualoffset','eutranintrafreqncell_cellqoffset',
  'eutraninterfreqncell_cellindividualoffset','eutraninterfreqncell_cellqoffset',
  'cellalgoswitch_dlpacketlenawareschsw','cellalgoswitch_interfreqmlbswitch',
  'cellalgoswitch_spectraleffbasedloadevalsw','cellalgoswitch_causerloadtransfersw',
  'cellalgoswitch_dedipriomanageonlowloadsw','cellalgoswitch_activeuebasedloadevalsw',
  'cellmlb_mlbtriggermode','cellmlb_synchronizedue','cellmlb_idleue','cellresel_qrxlevmin',
  'cellsel_qrxlevmin','txbranch_txhwmaxpwr','cellpdcchalgo_pdcchcapacityimproveswitch',
  'created_at'];
  
  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });


  constructor(public overlay: CustomOverlayService,
    private docTitleService: Title, 
    private neiranService: NeiranMonitoreoService) { }

  ngOnInit(): void {
    this.dataSource = new PaginatedDataSource<any>(
      (request: PageRequest<any>) => this.neiranService.getAll(request),
      { field: 'created_at', order: 'desc' }, 10
    )

    this.docTitleService.setTitle('Monitoreo - ' + environment.appTitle)
    
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
    this.neiranService
    .export(this.dataSource.lastFilter)
    .subscribe((data) => Util.download(data, 'export-monitoreo_neiran'));
  }

}
