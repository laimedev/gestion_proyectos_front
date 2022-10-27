import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { Thresholds } from '../../domain/thresholds-comand';
import { FormThresholdService } from '../../service/form-threshold.service';
import { ThresholdService } from '../../service/threshold.service';


@Component({
  selector: 'app-threshold-modal-edit',
  templateUrl: './threshold-modal-edit.component.html',
  styleUrls: ['./threshold-modal-edit.component.scss']
})
export class ThresholdModalEditComponent implements OnInit {

  @Input() cmd: Thresholds
  formLoaded = false
  disableControl = false;
  formGroup: FormGroup;

  constructor(protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    protected formService: FormThresholdService,
    protected thresholdService: ThresholdService) { }

  ngOnInit(): void {

    this.thresholdService.byId(this.cmd.id).subscribe((data: Thresholds) => {
      this.formService.fill = data
      this.formLoaded = true
    })

    this.formGroup = this.formService.form;


  }

  onClose($res: any) {
    this.activeModal.close($res)
  }

  onSubmit(cmd: Thresholds) {
    this.disableForm()
    cmd.id = this.cmd.id
    this.thresholdService.edit(cmd).subscribe(data => {
      SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
      this.enableForm()
      this.activeModal.close(true)
    }, (error) => {
      SnackbarHelper.error(this.snackBar, { msg: 'No se puede actualizar el comando en estos momentos', })
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
