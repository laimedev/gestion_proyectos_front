import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartamentoService } from '../services/departamento.service';
import { Proyecto } from '../../../entities/modulos/proyecto';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.scss']
})
export class DepartamentoFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Proyecto>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false
  statusActive: boolean = false;

  statusEntity = [
    {value: 'Activo', label: 'Activo'},
    {value: 'Inactivo', label: 'Inactivo'},
]


  constructor(protected fb: FormBuilder,
              protected activeModal: NgbActiveModal,
              private modalService: NgbModal,
              public departamentoService: DepartamentoService) { }

  ngOnInit(): void {
    this.formGroup.reset();
    if(this.formTitle === 'EDITAR DEPARTAMENTO'){
      // this.formGroup.get('username').disable();
      this.statusActive = false;
      // this.formLDAP = false;
    } else{
      // this.newUser = false;
      this.statusActive = true;

    }

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

