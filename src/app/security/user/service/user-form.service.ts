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
     
           username: ['', [Validators.required]],
           company: ['', [Validators.required]],
           fullname: ['', [Validators.required]],
           password: ['', []],
           passwordr: ['', []],
           email: ['', [Validators.required]],
           emailr: ['', [Validators.required]],
           area: ['', [Validators.required]],
           cellphone: ['', []],
           commentUser: ['', []],
           status: ['', [Validators.required]],
           roleIds: [[], [ Validators.required]]
         }, {validators: [confirmValidator('password', 'passwordr'), confirmValidator('email', 'emailr')]}
       )      
   }

   get form (): FormGroup { return this.formGroup; }

   set fillForm(user: User) {
    this.formGroup.get('username').setValue(user.username)
    this.formGroup.get('company').setValue(user.company)
    this.formGroup.get('fullname').setValue(user.fullname)
    this.formGroup.get('email').setValue(user.email)
    this.formGroup.get('emailr').setValue(user.emailr)
    this.formGroup.get('area').setValue(user.area)
    this.formGroup.get('cellphone').setValue(user.cellphone)
    this.formGroup.get('commentUser').setValue(user.commentUser)
    this.formGroup.get('status').setValue(user.status?'1':'2')
    this.formGroup.get('roleIds').setValue(Util.onlyIds(user.roles))

   }
   



}
