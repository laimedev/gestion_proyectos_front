import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/entities/modulos/empleado';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.scss']
})
export class EditEmpleadoComponent implements OnInit {


  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() empleado: Empleado

  constructor(
    protected formService: EmpleadoService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
      
  }

  ngOnInit(): void {
    console.log(this.empleado)
    this.formService.getById({ "_id": this.empleado._id}).subscribe(data => {
      console.log(data)
      console.log("cargo editar")
      this.formService.fillForm = data['personal'][0]
      this.formLoaded = true
    })
    this.formGroup = this.formService.form;
  }



  onSubmit(value: any) {
    console.log("enviar")
  this.disableForm()
      value._id = this.empleado._id
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
