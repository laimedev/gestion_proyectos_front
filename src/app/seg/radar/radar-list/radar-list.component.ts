import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { CustomOverlayService } from 'src/app/services/overlay/custom-overlay.service';
import { PaginatedDataSource } from 'src/app/utils/paginator/paginated-data-source';
import {RadarService} from 'src/app/seg/service/radar.service'
import { PageRequest } from 'src/app/utils/paginator/page-utils';
import { environment } from 'src/environments/environment';
import { Util } from 'src/app/utils/helpers/util';

@Component({
  selector: 'app-radar-list',
  templateUrl: './radar-list.component.html',
  styleUrls: ['./radar-list.component.scss']
})
export class RadarListComponent implements OnInit {

  dataSource: PaginatedDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable, { static: false, read: ElementRef }) table_: ElementRef;
displayedColumns: string[] = 
['id', 'cell_name', 'sector','year','month','day','hour','dia_de_evaluacion',
'l_csfb_e2w','l_csfb_prepatt','l_csfb_lcs_prepatt','l_rrc_connreq_succ_emc',
'l_rrc_connreq_succ_highpri','l_rrc_connreq_succ_mt',
'l_rrc_connreq_att_highpri','l_rrc_connreq_att_mt','l_rrc_connreq_att_modata',
'l_rrc_connreq_att_delaytol','l_e_rab_succest','l_e_rab_attest',
'l_s1sig_connest_succ','l_s1sig_connest_att','l_e_rab_abnormrel',
'l_e_rab_normrel','l_thrp_bits_dl_qci_6','l_thrp_bits_dl_qci_7',
'l_thrp_bits_dl_qci_8','l_thrp_bits_dl_lasttti_qci_6','l_thrp_bits_dl_lasttti_qci_7',
'l_thrp_bits_dl_lasttti_qci_8','l_thrp_time_dl_rmvlasttti_qci_6','l_thrp_time_dl_rmvlasttti_qci_7',
'l_thrp_time_dl_rmvlasttti_qci_8','l_e_rab_succest_qci_1','l_e_rab_attest_qci_1',
'l_e_rab_succest_qci_5','l_e_rab_attest_qci_5','l_e_rab_abnormrel_qci_1',
'l_iratho_srvcc_e2w_execsuccout','l_iratho_srvcc_e2w_mmeabnormrsp','l_iratho_srvcc_e2w_execattout',
'l_iratho_srvcc_e2w_prepattout','l_ul_interference_avg','l_chmeas_cqi_dl_0',
'l_chmeas_cqi_dl_1','l_chmeas_cqi_dl_2','l_chmeas_cqi_dl_3','l_chmeas_cqi_dl_4',
'l_chmeas_cqi_dl_5','l_chmeas_cqi_dl_6','l_chmeas_cqi_dl_7','l_chmeas_cqi_dl_8',
'l_chmeas_cqi_dl_9','l_chmeas_cqi_dl_10','l_chmeas_cqi_dl_11','l_chmeas_cqi_dl_12',
'l_chmeas_cqi_dl_13','l_chmeas_cqi_dl_14','l_chmeas_cqi_dl_15',

'l_thrp_bits_dl','l_thrp_bits_ul','l_traffic_user_avg','l_traffic_user_max','l_chmeas_prb_dl_used_avg',


'l_ra_ta_ue_index0','l_ra_ta_ue_index1','l_ra_ta_ue_index2','l_ra_ta_ue_index3','l_ra_ta_ue_index4',
'l_ra_ta_ue_index5','l_ra_ta_ue_index6','l_ra_ta_ue_index7',

'l_ra_ta_ue_index8','l_ra_ta_ue_index9','l_ra_ta_ue_index10','l_ra_ta_ue_index11',

'createdat'];
 
  dateRange = new FormGroup({
    start: new FormControl('', [Validators.required]),
    end: new FormControl('', [Validators.required])
  });

  constructor(public overlay: CustomOverlayService,
    private docTitleService: Title,
    private radarService: RadarService) { }

    ngOnInit(): void {
      this.dataSource = new PaginatedDataSource<any>(
        (request: PageRequest<any>) => this.radarService.getAll(request),
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
      this.radarService
      .export(this.dataSource.lastFilter)
      .subscribe((data) => Util.download(data, 'export-monitoreo_radar'));
    }

    roundTo = function(num: number, places: number) {
      const factor = 10 ** places;
      return Math.round(num * factor) / factor;
    };

}
