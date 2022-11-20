import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from 'src/app/entities/modulos/tarea';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { TareaService } from '../../services/tarea.service';
import { TrabajoService } from '../../services/trabajo.service';

@Component({
  selector: 'app-delete-tarea',
  templateUrl: './delete-tarea.component.html',
  styleUrls: ['./delete-tarea.component.scss']
})
export class DeleteTareaComponent implements OnInit {

  @Input() tarea: Tarea
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected tareaService: TareaService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.tareaService.delete(this.tarea).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}

