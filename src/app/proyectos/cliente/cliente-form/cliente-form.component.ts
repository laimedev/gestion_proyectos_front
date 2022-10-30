import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from 'src/app/entities/modulos/cliente';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {

  
  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Cliente>()
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
    public clienteService: ClienteService,
    private dateAdapter: DateAdapter<Date>) {
      
      this.dateAdapter.setLocale('en-GB'); 

    }

  ngOnInit(): void {
    this.formGroup.reset();
    if(this.formTitle === 'EDITAR CLIENTE'){
      // this.formGroup.get('username').disable();
      this.statusActive = false;
      // this.formLDAP = false;
    } else{
      // this.newUser = false;
      this.statusActive = true;

    }
  }



  onSubmit() {

    // const date = new Date(Date.parse(this.formGroup.get('fecha_nacimiento').value))
    // this.formGroup.get('fecha_nacimiento')?.setValue(date);
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


  buscarRuc(ruc: string){

    this.formGroup = this.clienteService.form;


    this.clienteService.buscarRuc(ruc).subscribe(r => {
      console.log(r)
      if(!r.success){
        // alert(r.message);
        // this.empresa.razonSocial = "";
      }
      else{
        // this.formGroup = r.result;
        this.formGroup.get('razonSocial')?.setValue(r.result.razonSocial);
        this.formGroup.get('condicion')?.setValue(r.result.condicion);
        this.formGroup.get('departamento')?.setValue(r.result.departamento);
        this.formGroup.get('provincia')?.setValue(r.result.provincia);
        this.formGroup.get('distrito')?.setValue(r.result.distrito);
        this.formGroup.get('direccion')?.setValue(r.result.direccion);
      }
    });
  }
  
}

