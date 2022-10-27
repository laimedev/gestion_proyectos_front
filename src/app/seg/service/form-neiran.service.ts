import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NeiranCommand } from '../domain/neiran-command';
@Injectable({
  providedIn: 'root'
})
export class FormNeiranService {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      id:[''],
      prefix: ['', [Validators.required]],
      mo: ['', [Validators.required]],
      parameter: ['', [Validators.required]],
      name_parameter: ['', [Validators.required]],
      type_parameter: ['', [Validators.required]],
      object: ['', [Validators.required]],
      search_name: ['', [Validators.required]],
      mml: ['', [Validators.required]],
    },
    )
  }

  get form (): FormGroup { return this.formGroup; }

  set fill(cmd: NeiranCommand) {

    this.formGroup.get('id').setValue(cmd.id)
    this.formGroup.get('prefix').setValue(cmd.prefix)
    this.formGroup.get('mo').setValue(cmd.parameter)
    this.formGroup.get('parameter').setValue(cmd.parameter)
    this.formGroup.get('name_parameter').setValue(cmd.name_parameter)
    this.formGroup.get('type_parameter').setValue(cmd.type_parameter)
    this.formGroup.get('object').setValue(cmd.object)
    this.formGroup.get('search_name').setValue(cmd.search_name)
    this.formGroup.get('mml').setValue(cmd.mml)

  }




}
