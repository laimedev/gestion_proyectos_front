import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProyectoService } from '../services/proyecto.service';
import { Proyecto } from '../../../entities/modulos/proyecto';
import { EmpleadoService } from 'src/app/empleados/empleado/services/empleado.service';
import { ClienteService } from '../../cliente/services/cliente.service';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-proyecto-form',
  templateUrl: './proyecto-form.component.html',
  styleUrls: ['./proyecto-form.component.scss']
})
export class ProyectoFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Proyecto>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false
  statusActive: boolean = false;

  statusEntity = [
    {value: 'Nuevo', label: 'Nuevo'},
    {value: 'En curso', label: 'En curso'},
    {value: 'Terminado', label: 'Terminado'},
    {value: 'Cancelado', label: 'Cancelado'}
]


  public responsable: any [] = []; 
  public cliente: any [] = []; 


  @Input() fecha_term: boolean;

  constructor(protected fb: FormBuilder,
              protected activeModal: NgbActiveModal,
              private modalService: NgbModal,
              public proyectoService: ProyectoService,
              public empleadoService: EmpleadoService,
              public clienteService: ClienteService) {

                this.formGroup = this.proyectoService.form;

               }

  ngOnInit(): void {

    this.cargarEmpleado();
    this.cargarCliente();




 
    this.formGroup.reset();
    if(this.formTitle === 'EDITAR PROYECTO'){
      // this.formGroup.get('username').disable();
      this.statusActive = false;
      // this.formLDAP = false;
    } else{
      // this.newUser = false;
      this.statusActive = true;
      this.formGroup.get('estado')?.setValue('Nuevo')

    }



  }


  cargarEmpleado(){
    this.empleadoService.export().subscribe(resp => {
      console.log(resp)
      this.responsable = resp['data']
    })
  }


  cargarCliente(){
    this.clienteService.export().subscribe(resp => {
      console.log(resp)
      this.cliente = resp['data']
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


  changeStatus($event: MatSelectChange){
    console.log($event.value)
    if($event.value == 'Terminado') {
      console.log('terminado')
      this.fecha_term = true;
    this.formGroup.get('fecha_termino').enable()

    } else {
      console.log('reiniciar')
      this.fecha_term = false;
    }

  }



}

