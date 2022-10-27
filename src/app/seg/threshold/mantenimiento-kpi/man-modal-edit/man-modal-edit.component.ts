import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { NeiranCommand } from '../../../domain/neiran-command';
import { FormThresholdsKpiService } from '../../../service/form-thresholds-kpi.service';
import { ThresholdsKpiService } from '../../../service/thresholds-kpi.service';

@Component({
  selector: 'app-man-modal-edit',
  templateUrl: './man-modal-edit.component.html',
  styleUrls: ['./man-modal-edit.component.scss']
})
export class ManModalEditComponent implements OnInit {

  @Input() thre: NeiranCommand
  formLoaded = false
  disableControl = false;
  formGroup: FormGroup;

  constructor(protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    protected formService: FormThresholdsKpiService,
    private thresholdsKpiService: ThresholdsKpiService) { }

  ngOnInit(): void {

    this.thresholdsKpiService.byId(this.thre.id).subscribe((data: any) => {
      this.formService.fill = data
      this.formLoaded = true
    })

    this.formGroup = this.formService.form;
  }

  onClose($res: any) {
    this.activeModal.close($res);
    this.formGroup.reset();
  }

  onSubmit(cmd: NeiranCommand) {
    this.disableForm()
    cmd.id =  this.thre.id
    this.thresholdsKpiService.edit(cmd).subscribe(data => {
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
