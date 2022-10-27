import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { CreateProyectoComponent } from '../modal/create-proyecto/create-proyecto.component';
import { DeleteProyectoComponent } from '../modal/delete-proyecto/delete-proyecto.component';
import { EditProyectoComponent } from '../modal/edit-proyecto/edit-proyecto.component';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-proyecto-list',
  templateUrl: './proyecto-list.component.html',
  styleUrls: ['./proyecto-list.component.scss']
})
export class ProyectoListComponent implements OnInit {


  public data: any = [];


  // public proyecto: Curso[] = [];
  public proyecto: any[] = [];
  public proyectoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalProyecto: number = 0;

  constructor(public proyectoService: ProyectoService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }


  cargarProyectos(){
    this.cargando = true; 
    this.proyectoService.cargarProyectos(this.desde)
    .subscribe(({total, proyecto}) => {
        this.totalProyecto = total;
        if(proyecto.length !== 0) { 
          this.proyecto = proyecto;
          console.log(proyecto);
          this.proyectoTemp = proyecto;
        }
        this.cargando = false;
    })
  }


  openCreate(){
    const modalRef = this.modalService.open(CreateProyectoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        // this.dataSource.updateTable(0)
        this.cargarProyectos();
      })
  }


  openEdit(data: Proyecto) {
    const modalEdit = this.modalService.open(EditProyectoComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.proyecto = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
    })
  }

  openDelete(data: Proyecto) {
    const deleteModal = this.modalService.open(DeleteProyectoComponent, { size: 'lg', backdrop: 'static' })
    deleteModal.componentInstance.proyecto = data
    deleteModal.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
    })
  }

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalProyecto) {
      this.desde -= valor;
    }
    this.cargarProyectos();
  }

}
