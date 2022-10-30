import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { TrabajoService } from '../../services/trabajo.service';

@Component({
  selector: 'app-delete-trabajo',
  templateUrl: './delete-trabajo.component.html',
  styleUrls: ['./delete-trabajo.component.scss']
})
export class DeleteTrabajoComponent implements OnInit {

  @Input() trabajo: Trabajo
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected trabajoService: TrabajoService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.trabajoService.delete(this.trabajo).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}
