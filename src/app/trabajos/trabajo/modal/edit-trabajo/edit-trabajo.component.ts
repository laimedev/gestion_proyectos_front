import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { TrabajoService } from '../../services/trabajo.service';

@Component({
  selector: 'app-edit-trabajo',
  templateUrl: './edit-trabajo.component.html',
  styleUrls: ['./edit-trabajo.component.scss']
})
export class EditTrabajoComponent implements OnInit {

  formGroup: FormGroup;
  formLoaded = false
  disableControl = false;
  serverResponseJSON: any
  @Input() trabajo: Trabajo

  constructor(
    protected formService: TrabajoService,
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.formService.getById({ "_id": this.trabajo._id}).subscribe(data => {
      console.log(data)
      console.log("cargo editar")
      this.formService.fillForm = data['trabajo'][0]
      this.formLoaded = true
    })
    this.formGroup = this.formService.form;
  }


  onSubmit(value: any) {
    console.log("enviar")
  this.disableForm()
      value._id = this.trabajo._id
      this.formService.edit(value).subscribe(data => {
        SnackbarHelper.show(this.snackBar, { msg: 'Editó con éxito', })
        this.enableForm()
        this.activeModal.close(true)
      }, (error) => {
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


  onClose($res: any) {
    this.activeModal.close($res)
  }

}
