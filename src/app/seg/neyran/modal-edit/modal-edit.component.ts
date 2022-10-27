import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { NeiranCommand } from '../../domain/neiran-command';
import { FormNeiranService } from '../../service/form-neiran.service';
import { NeiranService } from '../../service/neiran.service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss']
})
export class ModalEditComponent implements OnInit {


  @Input() cmd: NeiranCommand
  formLoaded = false
  disableControl = false;
  formGroup: FormGroup;

  constructor(protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar,
    protected formService: FormNeiranService,
    protected neiranService: NeiranService) { }

  ngOnInit(): void {

    this.neiranService.byId(this.cmd.id).subscribe((data: NeiranCommand) => {
      console.log("cargo editar")
      this.formService.fill = data

      this.formLoaded = true

    })

    this.formGroup = this.formService.form;

  }

  onClose($res: any) {
    this.activeModal.close($res)
  }

  onSubmit(cmd: NeiranCommand) {
    this.disableForm()
    cmd.id = this.cmd.id
    this.neiranService.edit(cmd).subscribe(data => {
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
