import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
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


  sexo = [
    {value: 'M', label: 'Masculino'},
    {value: 'F', label: 'Femenino'}
  ]


  estado = [
    {value: 'Activo', label: 'Activo'},
    {value: 'Inactivo', label: 'Inactivo'}
  ]


  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public empleadoService: EmpleadoService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {
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



  onSubmit() {

    const date = new Date(Date.parse(this.formGroup.get('fecha_nacimiento').value))
    // let startStr = new Intl.DateTimeFormat('es-PE', {   year: 'numeric', month: '2-digit', day: '2-digit' }).format(date)
    this.formGroup.get('fecha_nacimiento')?.setValue(date);

    // console.log(startStr)

    
    console.log(this.formGroup.value);
    // this.refreshTable = true
    // this.formGroup.get('id').setValue(this.selectedRols)
    // if (this.selectedRols.length<1)
    //   this.formGroup.get('id').setErrors({'ee': true})
    // this.formSubmit = true;
    // if (this.formGroup.valid) {
      this.submitEvent.emit(this.formGroup.value)
      this.formGroup.reset();
    // }
  }


  change($event){
    console.log($event)
  }


  closeMOdal() {
    this.closeEvent.emit(this.refreshTable)
    this.modalService.dismissAll();
  }

}
