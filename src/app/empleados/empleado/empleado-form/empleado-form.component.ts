import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CargoService } from 'src/app/configuracion/cargo/services/cargo.service';
import { DepartamentoService } from 'src/app/configuracion/departamento/services/departamento.service';
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


  sexo = [
    {value: 'M', label: 'Masculino'},
    {value: 'F', label: 'Femenino'}
  ]


  estado = [
    {value: 'Activo', label: 'Activo'},
    {value: 'Inactivo', label: 'Inactivo'}
  ]


  public departamento: any [] = [];
  public cargo: any [] = [];

  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public empleadoService: EmpleadoService,
    public departamentoService: DepartamentoService,
    public cargoService: CargoService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {


    this.cargarDepartamento();
    this.cargarCargo();

    this.formGroup.reset();
    if(this.formTitle === 'EDITAR EMPLEADO'){
      // this.formGroup.get('username').disable();
      this.statusActive = false;
      // this.formLDAP = false;
    } else{
      // this.newUser = false;
      this.statusActive = true;

    }
  }



  cargarDepartamento(){
    this.departamentoService.cargarDepartamento().subscribe(resp => {
      console.log(resp)
      this.departamento = resp['departamento']
    })
  }

  cargarCargo(){
    this.cargoService.cargarCargo().subscribe(resp => {
      console.log(resp)
      this.cargo = resp['cargo']
    })
  }



  onSubmit() {

    const date = new Date(Date.parse(this.formGroup.get('fecha_nacimiento').value))
    this.formGroup.get('fecha_nacimiento')?.setValue(date);
    console.log(this.formGroup.value);
      this.submitEvent.emit(this.formGroup.value)
      this.formGroup.reset();
  }


  change($event){
    console.log($event)
  }


  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }

}
