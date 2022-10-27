import { Component, OnInit } from '@angular/core';
import { RolFormService } from '../../service/rol-form.service'
import { FormGroup } from '@angular/forms';
import { Rol } from '../../../../entities/security/rol'
import { RolService } from '../../../../services/security/rol.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarHelper } from '../../../../utils/helpers/snackbar-helper'
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.scss'],
  providers: [
    RolFormService
  ]
})
export class CreateRolComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;
  serverResponseJSON: any


  constructor(
    protected rolFormService: RolFormService, 
    protected rolService: RolService, 
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {

    this.formGroup = rolFormService.form;

  }

  onClose($event: boolean) {
    this.activeModal.close($event)
  }

  onSubmit(rol: Rol) {

    this.disableForm()
    this.serverResponseJSON = null
    this.rolService.saveRol(rol).subscribe(res => {
      
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
      this.enableForm()
      this.activeModal.close(true)

    }, (error) => {
      
      this.serverResponseJSON = error
      this.enableForm()

    })

  }

  ngOnInit(): void {

  }

  disableForm(): void {
    this.disableControl = true
    this.formGroup.disable()
  }

  enableForm() {
    this.disableControl = false
      this.formGroup.enable()
  }

}
