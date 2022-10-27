import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Thresholds } from '../../domain/thresholds-comand';
import { ThresholdService } from '../../service/threshold.service';

@Component({
  selector: 'app-threshold-modal-delete',
  templateUrl: './threshold-modal-delete.component.html',
  styleUrls: ['./threshold-modal-delete.component.scss']
})
export class ThresholdModalDeleteComponent implements OnInit {

  @Input() cmd: Thresholds
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal, private thresholdService: ThresholdService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close(true)
  }

  delSeg() {
    this.deleting = true
    this.thresholdService.delete(this.cmd.id).subscribe(data => {
      this.deleted = true
      this.deleting = false
      this.closeModal()
    })
  }

}
