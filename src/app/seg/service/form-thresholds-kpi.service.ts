import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThresholdTable } from '../domain/threshold.table';

@Injectable({
  providedIn: 'root'
})
export class FormThresholdsKpiService {

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    /**
     * ##1 Se prioriza el método dummy pero queda por si piden cambiar más adelante.
     * Borrar en el siguiente commit
     */
    let conds = {
      tipo: ['', []],
      fuente: ['', []],
      kpi: ['', []],
      condicion: ['', []],
      threshold: ['', []],
    }


    this.formGroup = this.fb.group({
      n_cond: [4],
      kpi:['', [Validators.required]],
      banda: ['', [Validators.required]],
      poligono: ['', [Validators.required]],
      source_1_type:[],
      source_1_cell: [],
      source_1_value:[],
      source_1_criterio: [],
      ref_1_value:[],
      source_2_type:[],
      source_2_cell: [],
      source_2_value:[],
      source_2_criterio: [],
      ref_2_value:[],
      source_3_type:[],
      source_3_cell: [],
      source_3_value:[],
      source_3_criterio: [],
      ref_3_value:[],
      source_4_type:[],
      source_4_cell: [],
      source_4_value:[],
      source_4_criterio: [],
      ref_4_value:[]

      // ref ##1
      // conds : fb.array(
      //   [
      //     this.fb.group({...conds}),
      //     this.fb.group({...conds}),
      //     this.fb.group({...conds}),
      //     this.fb.group({...conds})
      //   ]
      // )
    },
    )
   }

  get form (): FormGroup { return this.formGroup; }

  set fill(data: ThresholdTable) {
    this.formGroup.get('n_cond').setValue(data.n_cond)
    this.formGroup.get('kpi').setValue(data.kpi)
    this.formGroup.get('banda').setValue(data.banda)
    this.formGroup.get('poligono').setValue(data.poligono)

    this.formGroup.get('source_1_type').setValue(data.source_1_type)
    this.formGroup.get('source_1_cell').setValue(data.source_1_cell)
    this.formGroup.get('source_1_value').setValue(data.source_1_value)
    this.formGroup.get('source_1_criterio').setValue(data.source_1_criterio)
    this.formGroup.get('ref_1_value').setValue(data.ref_1_value)

    this.formGroup.get('source_2_type').setValue(data.source_2_type)
    this.formGroup.get('source_2_cell').setValue(data.source_2_cell)
    this.formGroup.get('source_2_value').setValue(data.source_2_value)
    this.formGroup.get('source_2_criterio').setValue(data.source_2_criterio)
    this.formGroup.get('ref_2_value').setValue(data.ref_2_value)

    this.formGroup.get('source_3_type').setValue(data.source_3_type)
    this.formGroup.get('source_3_cell').setValue(data.source_3_cell)
    this.formGroup.get('source_3_value').setValue(data.source_3_value)
    this.formGroup.get('source_3_criterio').setValue(data.source_3_criterio)
    this.formGroup.get('ref_3_value').setValue(data.ref_3_value)

    this.formGroup.get('source_4_type').setValue(data.source_4_type)
    this.formGroup.get('source_4_cell').setValue(data.source_4_cell)
    this.formGroup.get('source_4_value').setValue(data.source_4_value)
    this.formGroup.get('source_4_criterio').setValue(data.source_4_criterio)
    this.formGroup.get('ref_4_value').setValue(data.ref_4_value)


  }
}
