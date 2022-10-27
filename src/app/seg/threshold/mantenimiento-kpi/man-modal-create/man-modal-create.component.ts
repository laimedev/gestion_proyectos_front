import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { FormThresholdsKpiService } from '../../../service/form-thresholds-kpi.service';
import { ThresholdsKpiService } from '../../../service/thresholds-kpi.service';

@Component({
  selector: 'app-man-modal-create',
  templateUrl: './man-modal-create.component.html',
  styleUrls: ['./man-modal-create.component.scss']
})
export class ManModalCreateComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;

  constructor(protected formService: FormThresholdsKpiService,
    protected activeModal: NgbActiveModal,
    protected thresholdService: ThresholdsKpiService,
    private snackBar: MatSnackBar) {
      this.formGroup = formService.form;
    }

  ngOnInit(): void {
    this.formGroup.reset()
  }

  onClose($res: boolean) {
    this.formGroup.reset()
    this.activeModal.close($res)
  }

  onSubmit(value: any) {
    
    this.disableForm()
    this.thresholdService.create(value).subscribe(data => {
      
      this.enableForm()
      this.formGroup.reset()
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
      /** Refresh table */
      this.activeModal.close(true)
      
    }, (error) => {
      SnackbarHelper.error(this.snackBar, { msg: 'No se puede crear el comando en estos momentos', })
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
