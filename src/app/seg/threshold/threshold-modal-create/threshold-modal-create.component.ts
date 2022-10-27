import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormThresholdService} from 'src/app/seg/service/form-threshold.service'
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { Thresholds } from '../../domain/thresholds-comand';
import { ThresholdService } from '../../service/threshold.service';

@Component({
  selector: 'app-threshold-modal-create',
  templateUrl: './threshold-modal-create.component.html',
  styleUrls: ['./threshold-modal-create.component.scss']
})
export class ThresholdModalCreateComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;

  constructor(protected formService: FormThresholdService, 
    protected activeModal: NgbActiveModal,
    protected thresholdService: ThresholdService,
    private snackBar: MatSnackBar) { 
      this.formGroup = formService.form;
    }

  ngOnInit(): void {
  }

  onClose($res: boolean) {

    this.formGroup.reset()
    this.activeModal.close($res)
  }

  onSubmit(value: Thresholds) {
    
    this.disableForm()
    this.thresholdService.createCommand(value).subscribe(data => {
      
      this.enableForm()
      this.formGroup.reset()

      
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
      /** Refresh table */
      this.activeModal.close(true)
      
    }, (error) => {
      SnackbarHelper.error(this.snackBar, { msg: 'No se puede crear el nuevo threshold', })
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
