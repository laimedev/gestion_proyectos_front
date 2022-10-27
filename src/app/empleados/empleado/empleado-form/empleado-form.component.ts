import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/entities/modulos/empleado';
import { EmpleadoService } from '../services/empleado.service';


@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.scss']
})
export class EmpleadoFormComponent implements OnInit {


  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Empleado>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false
  statusActive: boolean = false;


  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public empleadoService: EmpleadoService) { }

  ngOnInit(): void {
  }



  onSubmit() {
    console.log(this.formGroup.value);
    // this.refreshTable = true
    // this.formGroup.get('id').setValue(this.selectedRols)
    // if (this.selectedRols.length<1)
    //   this.formGroup.get('id').setErrors({'ee': true})
    // this.formSubmit = true;
    if (this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value)
      this.formGroup.reset();
    }
  }



  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }
  
}
