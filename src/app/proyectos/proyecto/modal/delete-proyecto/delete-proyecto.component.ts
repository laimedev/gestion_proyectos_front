import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { ProyectoService } from '../../services/proyecto.service';


@Component({
  selector: 'app-delete-proyecto',
  templateUrl: './delete-proyecto.component.html',
  styleUrls: ['./delete-proyecto.component.scss']
})
export class DeleteProyectoComponent implements OnInit {

  @Input() proyecto: Proyecto
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected proyectoeService: ProyectoService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.proyectoeService.delete(this.proyecto).subscribe(data => {

      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })

      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}
