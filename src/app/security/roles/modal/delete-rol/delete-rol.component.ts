import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from 'src/app/entities/security/rol';
import { RolService } from 'src/app/services/security/rol.service';

@Component({
  selector: 'app-delete-rol',
  templateUrl: './delete-rol.component.html',
  styleUrls: ['./delete-rol.component.scss']
})
export class DeleteRolComponent implements OnInit {

  @Input() rol: Rol
  deleted = false
  deleting = false
  refreshTable = false;

  constructor(protected activeModal: NgbActiveModal, protected rolService: RolService) { }

  ngOnInit(): void {
  }

  closeMOdal(): void {
    this.activeModal.close(this.refreshTable)
  }

  deleteRol() {
    this.deleting = true
    this.rolService.delete(this.rol).subscribe(data => {
      this.activeModal.close(true)
      this.deleted = true
      this.deleting = false
      this.refreshTable = true
    })

  }

}
