import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/entities/modulos/cliente';
import { Empleado } from 'src/app/entities/modulos/empleado';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-delete-cliente',
  templateUrl: './delete-cliente.component.html',
  styleUrls: ['./delete-cliente.component.scss']
})
export class DeleteClienteComponent implements OnInit {
  @Input() cliente: Cliente
  deleted = false
  deleting = false

  constructor(protected activeModal: NgbActiveModal,
    protected clienteService: ClienteService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }


  closeModal() {
    this.activeModal.close(true)
  }

  delete() {
    this.deleting=true
    this.clienteService.delete(this.cliente).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Eliminado con éxito', })
      console.log(data);
      this.deleted = true
      this.deleting=false
      this.closeModal()
    })  
  }


}
