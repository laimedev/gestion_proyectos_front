import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Tarea } from 'src/app/entities/modulos/tarea';
import { Trabajo } from 'src/app/entities/modulos/trabajo';
import { ProyectoService } from 'src/app/proyectos/proyecto/services/proyecto.service';
import { TareaService } from '../../services/tarea.service';
import { DeleteTareaComponent } from '../delete-tarea/delete-tarea.component';


@Component({
  selector: 'app-create-tarea',
  templateUrl: './create-tarea.component.html',
  styleUrls: ['./create-tarea.component.scss']
})
export class CreateTareaComponent implements OnInit {

  @Input() formGroup: FormGroup;
  @Input() trabajo: Trabajo;

  formTitle = 'DETALLE DE LA ACTIVIDAD'


  public tareas = [];

  constructor(protected fb: FormBuilder,
    protected activeModal: NgbActiveModal,
    private modalService: NgbModal,
    public proyectoService: ProyectoService,
    public ngModal: NgbModal,
    public tareaService: TareaService) { 

      this.formGroup = this.tareaService.form;

    }

  ngOnInit(): void {

    this.cargarTareas();
    this.formGroup.get('actividad')?.setValue(this.trabajo._id)
  }


  onSubmit() {
    if (this.formGroup.invalid) {
      return
    }
    console.log('grabar')
    console.log(this.formGroup.value);  
    this.tareaService.create(this.formGroup.value).subscribe(resp => {
      console.log(resp);
      this.cargarTareas();
    })

  }

  // closeMOdal() {
  //   this.closeEvent.emit(this.refreshTable)
  //   this.modalService.dismissAll();
  // }

  cargarTareas() {
    this.tareaService.cargarTareas(this.trabajo._id).subscribe(resp => {
      this.tareas = resp['tarea']
      console.log(resp['tarea'])

    })
  }


  openDelete(data: Tarea) {
    const deleteModal = this.modalService.open(DeleteTareaComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.tarea = data
    deleteModal.result.then(res => {
      this.cargarTareas();
    })
  }



  closeMOdal(){
    this.ngModal.dismissAll();
    // this.formGroup.reset();
  }

}
