import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {FormNeiranService} from 'src/app/seg/service/form-neiran.service'
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { NeiranCommand } from '../../domain/neiran-command';
import { NeiranService } from '../../service/neiran.service';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;

  constructor(protected formService: FormNeiranService, 
    protected activeModal: NgbActiveModal,
    protected neiranService: NeiranService,
    private snackBar: MatSnackBar) {
      this.formGroup = formService.form;
     }

  ngOnInit(): void {
  }

  onClose($res: boolean) {

    this.activeModal.close($res)
  }

  onSubmit(value: NeiranCommand) {
    
    this.disableForm()
    this.neiranService.createCommand(value).subscribe(data => {
      
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
