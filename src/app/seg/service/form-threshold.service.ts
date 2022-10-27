import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Thresholds } from '../domain/thresholds-comand';

@Injectable({
  providedIn: 'root'
})
export class FormThresholdService {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.formGroup = this.fb.group({
      id:[''],
      flow: ['', [Validators.required]],
      name_threshold: ['', [Validators.required]],
      value_threshold: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      description: ['', []],
      created_at:  ['', []],
    },
    )
  }

  get form (): FormGroup { return this.formGroup; }

  set fill(cmd: Thresholds) {

    this.formGroup.get('id').setValue(cmd.id)
    this.formGroup.get('flow').setValue(cmd.flow)
    this.formGroup.get('name_threshold').setValue(cmd.name_threshold)
    this.formGroup.get('value_threshold').setValue(cmd.value_threshold)
    this.formGroup.get('unit').setValue(cmd.unit)
    this.formGroup.get('description').setValue(cmd.description)
    this.formGroup.get('created_at').setValue(cmd.created_at)

  }


}
