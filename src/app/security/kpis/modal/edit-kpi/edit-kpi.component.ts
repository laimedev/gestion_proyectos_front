import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Kpi } from 'src/app/entities/security/kpi';
import { KpiService } from 'src/app/services/security/kpi.service';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { KpiFormService } from '../../service/kpi-form.service';

@Component({
  selector: 'app-edit-kpi',
  templateUrl: './edit-kpi.component.html',
  styleUrls: ['./edit-kpi.component.scss'],
  providers: [
    KpiFormService
  ]
})
export class EditKpiComponent implements OnInit {

  formGroup: FormGroup;
  selectedRols: number[]

  formLoaded = false
  disableControl = false;

  @Input() kpi: Kpi

  constructor(
    protected formService: KpiFormService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    protected kpiService: KpiService) {
  }


  ngOnInit(): void {

    this.kpiService.getById(this.kpi).subscribe(data => {

      this.formService.fillForm = data
      this.formLoaded = true

    })

    this.formGroup = this.formService.form;

  }

  onClose($res: any) {
    this.activeModal.close($res)
  }
  onSubmit(value: Kpi) {
    
    this.disableForm()
    value.id = this.kpi.id
    this.kpiService.editKpi(value).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
      this.enableForm()
      this.activeModal.close(true)

    }, (error) => {
      SnackbarHelper.error(this.snackBar, { msg: 'No se puede actualizar el kpi en estos momentos', })
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
