import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class RolFormService {

  private formGroup: FormGroup;

  constructor(protected fb: FormBuilder) {
    this.formGroup = this.fb.group(
      {
        displayName: ['', [Validators.required]],
        description: ['', [Validators.maxLength(250)]],
        permissions: ['', []]
      }
    );

  }

  get form(): FormGroup {

    return this.formGroup;

  }

  set displayName(displayName:string) {
    this.formGroup.get('displayName').setValue(displayName)
  }

  set description(description: string) {
    this.formGroup.get('description').setValue(description)
  }

  set permissions(permissions: number[]) {
    this.formGroup.get('permissions').setValue(permissions)
  }
}
