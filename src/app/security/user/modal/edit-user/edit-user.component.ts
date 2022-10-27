import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserFormService } from '../../service/user-form.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/entities/security/user';
import { UserService } from 'src/app/services/security/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [
    UserFormService
  ]
})
export class EditUserComponent implements OnInit {

  formGroup: FormGroup;
  selectedRols: number[]

  formLoaded = false
  disableControl = false;

  @Input() user: User

  constructor(
    protected formService: UserFormService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    protected userService: UserService) {
  }


  ngOnInit(): void {

    this.userService.getById(this.user).subscribe(data => {
      console.log("cargo editar")
      this.formService.fillForm = data
      this.selectedRols = this.formGroup.get('roleIds').value as number[]
      this.formLoaded = true

    })

    this.formGroup = this.formService.form;

  }

  onClose($res: any) {
    this.activeModal.close($res)
  }

  onSubmit(value: User) {console.log("enviar")
this.disableForm()
    value.id = this.user.id
    this.userService.editUser(value).subscribe(data => {
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

}
