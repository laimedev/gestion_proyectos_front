import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { ProyectoService } from '../../services/proyecto.service';

@Component({
  selector: 'app-edit-proyecto',
  templateUrl: './edit-proyecto.component.html',
  styleUrls: ['./edit-proyecto.component.scss']
})
export class EditProyectoComponent implements OnInit {

  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() proyecto: Proyecto

  constructor(
    protected formService: ProyectoService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formService.getById({ "_id": this.proyecto._id}).subscribe(data => {
      console.log(data)
      console.log("cargo editar")
      this.formService.fillForm = data['proyecto'][0]
      this.formLoaded = true
    })
    this.formGroup = this.formService.form;
  }


  onSubmit(value: any) {
    console.log("enviar")
  this.disableForm()
      value._id = this.proyecto._id
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
