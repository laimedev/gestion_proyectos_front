import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NeiranCommand } from '../../domain/neiran-command';
import { NeiranService } from '../../service/neiran.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {

  @Input() cmd: NeiranCommand
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal, private neiranService: NeiranService) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close(true)
  }

  delSeg() {
    this.deleting = true
    this.neiranService.delete(this.cmd.id).subscribe(data => {
      this.deleted = true
      this.deleting = false
      this.closeModal()
    })

  }

}
