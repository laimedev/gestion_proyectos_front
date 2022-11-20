import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { ProyectoService } from 'src/app/proyectos/proyecto/services/proyecto.service';
import { TrabajoService } from '../services/trabajo.service';


@Component({
  selector: 'app-trabajo-form',
  templateUrl: './trabajo-form.component.html',
  styleUrls: ['./trabajo-form.component.scss']
})
export class TrabajoFormComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Output() submitEvent = new EventEmitter<Trabajo>()
  @Output() closeEvent =  new EventEmitter<boolean>()
  @Input() disableControl: boolean
  @Input() formTitle: string
  refreshTable = false
  statusActive: boolean = false;

  statusEntity = [
    {value: 'Activo', label: 'Activo'},
    {value: 'Inactivo', label: 'Inactivo'},
]

proyectos: [] = [];

  constructor(protected fb: FormBuilder,
              protected activeModal: NgbActiveModal,
              private modalService: NgbModal,
              public proyectoService: ProyectoService,
              public trabajoService: TrabajoService) { }

  ngOnInit(): void {
    this.cargarProyectos();
    this.formGroup.reset();
    if(this.formTitle === 'EDITAR ACTIVIDAD'){
      // this.formGroup.get('username').disable();
      this.statusActive = false;
      // this.formLDAP = false;
    } else{
      // this.newUser = false;
      this.statusActive = true;

    }

  }



  cargarProyectos(){
    this.proyectoService.export()
        .subscribe(res => { 
          this.proyectos = res['data'];
          console.log(res['data'])
        });
  }


  onSubmit() {
    console.log(this.formGroup.value);
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

