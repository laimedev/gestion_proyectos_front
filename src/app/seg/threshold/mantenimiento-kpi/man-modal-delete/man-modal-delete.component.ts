import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ThresholdTable } from '../../../domain/threshold.table';
import { ThresholdsKpiService } from '../../../service/thresholds-kpi.service';

@Component({
  selector: 'app-man-modal-delete',
  templateUrl: './man-modal-delete.component.html',
  styleUrls: ['./man-modal-delete.component.scss']
})

export class ManModalDeleteComponent implements OnInit {

  @Input() th: ThresholdTable
  deleted = false
  deleting = false
  constructor(protected activeModal: NgbActiveModal, protected thresholdsKpiService: ThresholdsKpiService) { }


  ngOnInit(): void {

  }

  closeModal() {
    this.activeModal.close(true)
  }

  delSeg() {
    this.deleting = true
    this.thresholdsKpiService.delete(this.th.id).subscribe(data => {
      this.closeModal()
      this.deleted = true
      this.deleting = false
    })

  }

}
