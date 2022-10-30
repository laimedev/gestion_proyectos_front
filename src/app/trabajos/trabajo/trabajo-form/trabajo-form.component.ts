import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
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
    {value: 'Nuevo', label: 'Nuevo'},
    {value: 'En curso', label: 'En curso'},
    {value: 'Pendiente', label: 'Pendiente'},
    {value: 'Cerrado', label: 'Cerrado'}
]


  constructor(protected fb: FormBuilder,
              protected activeModal: NgbActiveModal,
              private modalService: NgbModal,
              public trabajoService: TrabajoService) { }

  ngOnInit(): void {
    this.formGroup.reset();
    if(this.formTitle === 'EDITAR TRABAJO'){
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

