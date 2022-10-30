import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from '../services/cargo.service';
import { Cargo } from '../../../entities/modulos/cargo';
import { DepartamentoService } from '../../departamento/services/departamento.service';


@Component({
  selector: 'app-cargo-form',
  templateUrl: './cargo-form.component.html',
  styleUrls: ['./cargo-form.component.scss']
})
export class CargoFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Cargo>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false
  statusActive: boolean = false;

  statusEntity = [
    {value: 'Activo', label: 'Activo'},
    {value: 'Inactivo', label: 'Inactivo'},
]

  public despartamentos: any [] = [];

  constructor(protected fb: FormBuilder,
              protected activeModal: NgbActiveModal,
              private modalService: NgbModal,
              public cargoService: CargoService,
              public departamentoServices: DepartamentoService) { }

  ngOnInit(): void {

    this.cargarDepartamento();

    this.formGroup.reset();
    if(this.formTitle === 'EDITAR CARGO'){
      // this.formGroup.get('username').disable();
      this.statusActive = false;
      // this.formLDAP = false;
    } else{
      // this.newUser = false;
      this.statusActive = true;

    }

  }


  cargarDepartamento(){
    this.departamentoServices.cargarDepartamento().subscribe( resp => {
      console.log(resp);
      this.despartamentos = resp.departamento;

    })
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

