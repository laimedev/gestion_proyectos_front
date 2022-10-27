import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Kpi } from 'src/app/entities/security/kpi';
import { KpiService } from 'src/app/services/security/kpi.service';

@Component({
  selector: 'app-delete-kpi',
  templateUrl: './delete-kpi.component.html',
  styleUrls: ['./delete-kpi.component.scss']
})
export class DeleteKpiComponent implements OnInit {

  @Input() kpi: Kpi
  deleted = false
  deleting = false
  constructor(protected activeModal: NgbActiveModal, protected kpiService: KpiService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close(true)
  }

  deleteKpi() {
    this.deleting = true
    this.kpiService.delete(this.kpi).subscribe(data => {
      
      this.deleted = true
      this.deleting = false
      this.activeModal.close(true)
    })

  }

}
