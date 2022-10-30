import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Departamento } from 'src/app/entities/modulos/departamento';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { DepartamentoService } from '../../services/departamento.service';


@Component({
  selector: 'app-edit-departamento',
  templateUrl: './edit-departamento.component.html',
  styleUrls: ['./edit-departamento.component.scss']
})
export class EditDepartamentoComponent implements OnInit {

  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() departamento: Departamento

  constructor(
    protected formService: DepartamentoService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formService.getById({ "_id": this.departamento._id}).subscribe(data => {
      console.log(data)
      console.log("cargo editar")
      this.formService.fillForm = data['departamento'][0]
      this.formLoaded = true
    })
    this.formGroup = this.formService.form;
  }


  onSubmit(value: any) {
    console.log("enviar")
  this.disableForm()
      value._id = this.departamento._id
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
