import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Kpi } from 'src/app/entities/security/kpi';
import {Util} from 'src/app/utils/helpers/util'

import {confirmValidator} from 'src/app/utils/validators/confirm-validator'

@Injectable()
export class KpiFormService {

  formGroup: FormGroup;

  constructor(protected fb: FormBuilder) {

    this.formGroup = this.fb.group({
           kpi: ['', [Validators.required]],
           contador_radar: ['', [Validators.required]],
           contador_huawei: ['', [Validators.required]],
         }
       )      
   }

   get form (): FormGroup { return this.formGroup; }

   set fillForm(kpi: Kpi) {
    this.formGroup.get('kpi').setValue(kpi.kpi)
    this.formGroup.get('contador_radar').setValue(kpi.contador_radar)
    this.formGroup.get('contador_huawei').setValue(kpi.contador_huawei)
   }
   



}
