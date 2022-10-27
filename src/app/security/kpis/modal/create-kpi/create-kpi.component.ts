import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Kpi } from 'src/app/entities/security/kpi';
import { KpiService } from 'src/app/services/security/kpi.service';
import { KpiFormService } from '../../service/kpi-form.service';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';

@Component({
  selector: 'app-create-kpi',
  templateUrl: './create-kpi.component.html',
  styleUrls: ['./create-kpi.component.scss'],
  providers: [KpiFormService]
})
export class CreateKpiComponent implements OnInit {


  formGroup: FormGroup;
  disableControl = false;


  constructor(protected formService: KpiFormService,
    protected activeModal: NgbActiveModal,
    protected kpiService: KpiService,
    private snackBar: MatSnackBar
  ) {

    this.formGroup = formService.form;
    console.log(this.formGroup);
  }

  ngOnInit(): void {
  }


  onClose($res: boolean) {
    this.activeModal.close($res)
  }

  onSubmit(value: Kpi) {
    this.disableForm()
    this.kpiService.createKpi(value).subscribe(data => {

      this.enableForm()
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
      this.formGroup.reset()
      this.activeModal.close(true)

    }, (error) => {
      SnackbarHelper.error(this.snackBar, { msg: 'No se puede crear el kpi en estos momentos', })
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
