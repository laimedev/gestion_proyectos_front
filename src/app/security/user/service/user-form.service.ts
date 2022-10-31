import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/security/user';
import {Util} from 'src/app/utils/helpers/util'

import {confirmValidator} from 'src/app/utils/validators/confirm-validator'

@Injectable()
export class UserFormService {

  formGroup: FormGroup;

  constructor(protected fb: FormBuilder) {

    this.formGroup = this.fb.group({
     
           nombre: ['', [Validators.required]],
           email: ['', [Validators.required]],
           role: ['', [Validators.required]],
           password_show: [''],
         }
       )      
   }

   get form (): FormGroup { return this.formGroup; }

   set fillForm(user: User) {
    this.formGroup.get('nombre').setValue(user.nombre)
    this.formGroup.get('email').setValue(user.email)
    this.formGroup.get('role').setValue(user.role)
    this.formGroup.get('password_show').setValue(user.password_show)
    }
   


    


}
