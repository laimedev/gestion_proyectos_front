import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SeguimientoRan } from '../domain/seguimiento-ran';
import { RanService } from '../service/ran.service';

@Component({
  selector: 'app-del-seg-info',
  templateUrl: './del-seg-info.component.html',
  styleUrls: ['./del-seg-info.component.scss']
})
export class DelSegInfoComponent implements OnInit {

  @Input() seg: SeguimientoRan
  deleted = false
  deleting = false
  constructor(protected activeModal: NgbActiveModal, protected ranService: RanService) { }


  ngOnInit(): void {

  }

  closeModal() {
    this.activeModal.close(true)
  }

  delSeg() {
    this.deleting = true
    this.ranService.delete(this.seg).subscribe(data => {
      this.closeModal()
      this.deleted = true
      this.deleting = false
    })

  }

}
