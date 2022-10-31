import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/entities/modulos/empleado';
import { Util } from 'src/app/utils/helpers/util';
import { CreateEmpleadoComponent } from '../modal/create-empleado/create-empleado.component';
import { DeleteEmpleadoComponent } from '../modal/delete-empleado/delete-empleado.component';
import { EditEmpleadoComponent } from '../modal/edit-empleado/edit-empleado.component';
import { EmpleadoService } from '../services/empleado.service';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.scss']
})
export class EmpleadoListComponent implements OnInit {

  public data: any = [];


  public empleado: any[] = [];
  public empleadoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalEmpleado: number = 0;

  constructor(public empleadoService: EmpleadoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarEmpleado();
  }


  cargarEmpleado(){
    this.cargando = true; 
    this.empleadoService.cargarEmpleados(this.desde)
    .subscribe(({total, personal}) => {
        this.totalEmpleado = total;
        if(personal.length !== 0) { 
          this.empleado = personal;
          console.log(personal);
          this.empleadoTemp = personal;
        }
        this.cargando = false;
    })
  }


  openCreate(){
    const modalRef = this.modalService.open(CreateEmpleadoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarEmpleado();
      })
  }


  openEdit(data: Empleado) {
    const modalEdit = this.modalService.open(EditEmpleadoComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.empleado = data
    modalEdit.result.then(res => {
      this.cargarEmpleado();
    })
  }

  openDelete(data: Empleado) {
    const deleteModal = this.modalService.open(DeleteEmpleadoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.empleado = data
    deleteModal.result.then(res => {
      this.cargarEmpleado();
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalEmpleado) {
      this.desde -= valor;
    }
    this.cargarEmpleado();
  }


  export(){
    this.empleadoService.export()
        .subscribe(res => { Util.download(res['data'], 'personal'); console.log(res)});
  }


  buscar(termino: string) {
    if(termino.length === 0 ) {
      return this.empleado = this.empleadoTemp;
    }
    this.empleadoService.buscar('personal', termino)
    .subscribe(resultados => {
      this.empleado = resultados;
    });
  }

}
