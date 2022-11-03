import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/entities/modulos/proyecto';
import { Reporte } from 'src/app/entities/modulos/reporte';
import { ProyectoService } from 'src/app/proyectos/proyecto/services/proyecto.service';
import { PrintReportComponent } from '../modal/print-report/print-report.component';

@Component({
  selector: 'app-reporte-list',
  templateUrl: './reporte-list.component.html',
  styleUrls: ['./reporte-list.component.scss']
})
export class ReporteListComponent implements OnInit {



  public data: any = [];
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

  cambiarPagina( valor: number) {
    this.desde += valor;
    if(this.desde <0 ) {
      this.desde = 0;
    } else if (this.desde > this.totalProyecto) {
      this.desde -= valor;
    }
    this.cargarProyectos();
  }



  openPrint(data: Proyecto) {
    const modalEdit = this.modalService.open(PrintReportComponent, { size: 'lg', backdrop: 'static' })
    modalEdit.componentInstance.proyecto = data
    modalEdit.result.then(res => {
      // this.dataSource.updateTable(this.paginator.pageIndex)
      this.cargarProyectos();
    })
  }


}
