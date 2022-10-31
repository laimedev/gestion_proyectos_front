import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/security/login.service';
import { CreateReportComponent } from '../modal/create-report/create-report.component';
import { ViewProyectoComponent } from '../modal/view-proyecto/view-proyecto.component';
import { ProyectoService } from '../services/proyecto.service';

@Component({
  selector: 'app-mis-proyectos-list',
  templateUrl: './mis-proyectos-list.component.html',
  styleUrls: ['./mis-proyectos-list.component.scss']
})
export class MisProyectosListComponent implements OnInit {
  public data: any = [];
  public proyecto: any[] = [];
  public proyectoTemp: any[] = [];
  
  public cargando: boolean = true;
  public desde: number = 0;
  public formSubmited = false;
  public totalProyecto: number = 0;

  statusEntity = [
    {value: 'Nuevo', label: 'Nuevo'},
    {value: 'En curso', label: 'En curso'},
    {value: 'Cerrado', label: 'Cerrado'}
  ]

  public idPersonal

  constructor(public proyectoService: ProyectoService,
    private modalService: NgbModal,
    protected loginService: LoginService) { 
    
        this.idPersonal = loginService.getLogin()?.id

    }

  ngOnInit(): void {
    this.cargarProyectos();

  }


  cargarProyectos(){
    this.cargando = true; 
    this.proyectoService.getByPersonal(this.desde, { "responsable":  this.idPersonal})
    .subscribe(({total, proyecto}) => {
        console.log(proyecto);
        this.totalProyecto = total;
        if(proyecto.length !== 0) { 
          this.proyecto = proyecto;
          console.log(proyecto);
          this.proyectoTemp = proyecto;
        }
        this.cargando = false;
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



  openCreateReport(data){
    const modalRef = this.modalService.open(CreateReportComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.proyecto = data
    modalRef.result.then(res => {
        this.cargarProyectos();
      })
  }


  openViewProyect(){
    const modalRef = this.modalService.open(ViewProyectoComponent, { size: 'lg', backdrop: 'static' });
      modalRef.result.then(res => {
        this.cargarProyectos();
      })
  }



}
