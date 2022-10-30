import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/entities/modulos/cliente';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.scss']
})
export class EditClienteComponent implements OnInit {

  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() cliente: Cliente

  constructor(
    protected formService: ClienteService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formService.getById({ "_id": this.cliente._id}).subscribe(data => {
      console.log(data)
      console.log("cargo editar")
      this.formService.fillForm = data['cliente'][0]
      this.formLoaded = true
    })
    this.formGroup = this.formService.form;
  }


  onSubmit(value: any) {
    console.log("enviar")
  this.disableForm()
      value._id = this.cliente._id
      this.formService.edit(value).subscribe(data => {
        SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
        this.enableForm()
        this.activeModal.close(true)
      }, (error) => {
        this.enableForm()
      })
  
    }


  disableForm(): void {
    this.disableControl = true
    this.formGroup.disable()
  }

  enableForm() {
    this.disableControl = false
      this.formGroup.enable()
  }


  onClose($res: any) {
    this.activeModal.close($res)
  }

}
