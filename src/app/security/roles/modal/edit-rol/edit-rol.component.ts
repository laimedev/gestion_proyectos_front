import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Rol } from 'src/app/entities/security/rol';
import { RolFormService } from '../../service/rol-form.service';
import { RolService } from 'src/app/services/security/rol.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.scss'],
  providers: [RolFormService]
})
export class EditRolComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;
  serverResponseJSON: any

  formLoaded: boolean = false;

  

  rol$: Subscription;

  //selectedPermissions: number[]

  @Input() rol: Rol

  constructor(
    protected rolFormService: RolFormService,
    protected rolService: RolService,
    private snackBar: MatSnackBar,
    protected activeModal: NgbActiveModal
    ) {
    //this.formGroup = rolFormService.form;
  }

  ngOnInit(): void {

    this.rol$ = this.rolService.getById(this.rol).subscribe( rol => {
      
      this.rolFormService.description = rol.description
      this.rolFormService.displayName = rol.displayName
      this.rolFormService.permissions = this.rolService.onlyIds(rol.permissions)

      this.formLoaded = true
           
    })

    this.formGroup = this.rolFormService.form;


  }


  onClose($event: boolean) {
      this.activeModal.close($event)
    
  }

  onSubmit(rol: Rol) {


    rol.id = this.rol.id

    this.disableForm()
    this.serverResponseJSON = null
    this.rolService.editRol(rol).subscribe(res => {
      
      SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
      this.enableForm()
      this.activeModal.close(true)

    }, (error) => {
      
      this.serverResponseJSON = error
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

}
