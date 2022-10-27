import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarHelper } from 'src/app/utils/helpers/snackbar-helper';
import { EmpleadoService } from '../../services/empleado.service';

@Component({
  selector: 'app-create-empleado',
  templateUrl: './create-empleado.component.html',
  styleUrls: ['./create-empleado.component.scss']
})
export class CreateEmpleadoComponent implements OnInit {

  formGroup: FormGroup;
  disableControl = false;


  constructor(protected formService: EmpleadoService, 
    protected activeModal: NgbActiveModal,
    private snackBar: MatSnackBar) {

      this.formGroup = formService.form;

     }

  ngOnInit(): void {
  }


  onClose($res: boolean) {
    this.activeModal.close($res)
  }


  onSubmit(value: any) {
    // console.log(value);
    this.disableForm()
    this.formService.create(value).subscribe(data => {
      this.enableForm()
      SnackbarHelper.show(this.snackBar, { msg: 'Se creó con éxito', })
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




}
