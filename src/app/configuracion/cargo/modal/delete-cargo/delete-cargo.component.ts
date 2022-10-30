import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cargo } from 'src/app/entities/modulos/cargo';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { CargoService } from '../../services/cargo.service';


@Component({
  selector: 'app-delete-cargo',
  templateUrl: './delete-cargo.component.html',
  styleUrls: ['./delete-cargo.component.scss']
})
export class DeleteCargoComponent implements OnInit {

  @Input() cargo: Cargo
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected cargoService: CargoService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.cargoService.delete(this.cargo).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}
