import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {UserFormService} from '../../service/user-form.service'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/entities/security/user';
import { UserService } from 'src/app/services/security/user.service';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserFormService]
})
export class CreateUserComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;


  constructor(protected formService: UserFormService, 
    protected activeModal: NgbActiveModal,
    protected userService: UserService,
    private snackBar: MatSnackBar
    ) {

    this.formGroup = formService.form;

   }

  ngOnInit(): void {




  }

  onClose($res: boolean) {

    this.activeModal.close($res)
  }

  onSubmit(value: User) {
    
    this.disableForm()
    this.userService.createUser(value).subscribe(data => {
      
      this.enableForm()
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
      /** Refresh table */
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
